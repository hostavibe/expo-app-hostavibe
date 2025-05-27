import { ThemedText } from '@/src/components/ThemedText';
import { useUserContext } from '@/src/hooks/user-context';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';


type NewPostMode = 'new' | 'picture-selected' | 'picture-uploaded'


export const MyPostsScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  
  const [uploading, setUploading] = useState(false);
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [newPostMode, setNewPostMode] = useState<NewPostMode>('new');
  const [imageExtension, setImageExtension] = useState<string | null>(null);
  const [caption, setCaption] = useState(`Uploaded at ${new Date().toLocaleString()}`);

  const [imageData, setImageData] = useState<string | null>(null);
  const [imageDataBase64, setImageDataBase64] = useState<string | null>(null);

  const { supabase } = useUserContext();

  
  const uploadImagePost = async () => {
    const uri = imageData;
    if (!uri) {
      throw new Error('No image data');
    }

    try {
      if (!isLoaded) {
        throw new Error('Auth not loaded');
      }

      if (!isSignedIn || !userId) {
        throw new Error('User not authenticated');
      }

      setUploading(true);

      // Convert image to base64
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      
      // Remove the data URL prefix to get just the base64 string
      const base64Str = base64.split(',')[1];
      setImageDataBase64(base64Str);


      // Generate a unique filename
      // const filename = `${Date.now()}.jpg`;

      const getContentType = (): string => {
        // const extension = filename.split('.').pop()?.toLowerCase();

        switch (imageExtension) {
          case 'jpg':
          case 'jpeg':
            return 'image/jpeg';
          case 'png':
            return 'image/png';
          case 'gif':
            return 'image/gif';
          case 'webp':
            return 'image/webp';
          case 'svg':
            return 'image/svg+xml';
          default:
            return 'image/jpeg'; // fallback to jpeg
        }
      };

      const newUuid = uuidv4();
      const uploadFilename = `${newUuid}.${imageExtension}`;
      const uploadPath = `${userId}/${uploadFilename}`;

      console.log("UPLOADING IMAGE", uploadFilename)

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('user-posts')
        .upload(uploadPath, decode(base64Str), {
          contentType: getContentType(),
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      console.log("UPLOADED IMAGE", uploadData)

      // // Get the public URL
      // const { data: { publicUrl } } = supabase
      //   .storage
      //   .from('user-posts')
      //   .getPublicUrl(uploadPath);

      // const { data: signedUrl, error: tempUrlError } = await supabase
      //   .storage
      //   .from('user-posts')
      //   .createSignedUrl(uploadPath, 60);

      // const { data: downloadData, error: downloadError } = await supabase.storage.from('user-posts').download(uploadPath);
      // console.log("X", downloadData)

      // const { data: downloadData, error: downloadError } = await supabase
      //   .storage
      //   .from('user-posts')
      //   .download(uploadPath);

      // if (downloadError) {
      //   console.error('Download error:', downloadError);
      //   throw downloadError;
      // }

      // Convert blob to base64 data URL
      // const blobToBase64 = (blob: Blob): Promise<string> => {
      //   return new Promise((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.onload = () => resolve(reader.result as string);
      //     reader.onerror = reject;
      //     reader.readAsDataURL(blob);
      //   });
      // };

      // const base64Url = await blobToBase64(downloadData);
      // console.log("BASE64 URL", base64Url);

      // console.log("PUBLIC URL", publicUrl)
      console.log("UPLOAD PATH", uploadPath)

      const now = new Date().toISOString();

      const userPostData = {
        // image_url: publicUrl,
        bucket_content_id: uploadFilename,
        created_at: now,
        updated_at: now,
        clerk_user_id: userId,
        configuration_json: caption,
      }

      // Save to database
      const { error: dbError } = await supabase
        .from('user_posts')
        .insert(userPostData);

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw dbError;
      }

      if (imageDataBase64) {
        setImages([...images, imageDataBase64]);
      }

      Alert.alert('Success', 'Image uploaded successfully!');

    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      // Extract file extension from URI
      const extension = result.assets[0].fileName?.split('.').pop()?.toLowerCase() || null;
      setImageExtension(extension);
      setImageData(uri);
      setNewPostMode('picture-selected');
    }

    // if (!result.canceled && result.assets[0].uri) {
    //   await uploadImagePost(result.assets[0].uri);
    // }
  };

  
  const PickImageButton = () => {
    return (
      <TouchableOpacity 
        style={[styles.addButton, uploading && styles.addButtonDisabled]} 
        onPress={pickImage}
        disabled={uploading}
      >
        <Ionicons name="add-circle" size={24} color="#007AFF" />
        <Text style={styles.addButtonText}>
          Pick Photo
        </Text>
      </TouchableOpacity>
    )
  }

  const UploadImageButton = () => {
    return (
      <TouchableOpacity 
        style={[styles.addButton, uploading && styles.addButtonDisabled]} 
        onPress={uploadImagePost}
        disabled={uploading}
      >
        <Ionicons name="add-circle" size={24} color="#007AFF" />
        <Text style={styles.addButtonText}>
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </Text>
      </TouchableOpacity>
    )
  }

  const ImageActionButton = () => {
    if (newPostMode === 'picture-selected') {
      return <UploadImageButton />;
    }
    return <PickImageButton />;
  }


  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Create New Post</ThemedText>

      <View style={styles.inputGroup}>
        <ImageActionButton />
          <ThemedText>Caption [{imageExtension}]</ThemedText>
          <TextInput
            style={styles.input}
            value={caption}
            onChangeText={setCaption}
            placeholder="Enter caption"
            maxLength={50}
            autoFocus
          />
        </View>
        
      {imageData && (
        <Image source={{ uri: imageData }} style={styles.image} />
      )}
    </View>
  );
}

export default MyPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  inputGroup: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  imageList: {
    flex: 1,
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
}); 