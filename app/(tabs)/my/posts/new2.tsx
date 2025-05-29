import { uploadUserImagePost } from '@/src/api/supabase-db/meta/manageUserPost';
import { ThemedText } from '@/src/components/ThemedText';
import { useUserContext } from '@/src/hooks/user-context';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


type NewPostMode = 'new' | 'picture-selected' | 'picture-uploaded'


export const NewPostScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  
  const [uploading, setUploading] = useState(false);
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [newPostMode, setNewPostMode] = useState<NewPostMode>('new');
  const [imageExtension, setImageExtension] = useState<string | null>(null);
  const [caption, setCaption] = useState(`Uploaded at ${new Date().toLocaleString()}`);

  const [imageData, setImageData] = useState<string | null>(null);
  // const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imageDataBase64, setImageDataBase64] = useState<string | null>(null);

  const { supabase } = useUserContext();

  
  const uploadImagePost = async () => {
    if (!isSignedIn || !userId) {
      throw new Error('User not authenticated');
    }

    if (imageDataBase64 === null) {
      throw new Error('No image data');
    }

    if (!isLoaded) {
      throw new Error('Auth not loaded');
    }

    try {
      setUploading(true);

      const imageBlob = decode(imageDataBase64);
      await uploadUserImagePost(supabase, userId, caption, '#000000', imageBlob, imageExtension);

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
      <ThemedText type="title" style={styles.title}>Create New Post 2</ThemedText>

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

export default NewPostScreen;

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