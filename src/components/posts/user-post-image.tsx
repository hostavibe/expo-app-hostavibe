import { UserPostDetailsForId } from "@/src/api/types/user-post-details-for-id";
import { useUserContext } from "@/src/hooks/user-context";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface UserPostImageProps {
  post: UserPostDetailsForId;
}

export const UserPostImage = (props: UserPostImageProps) => {
  const { supabase } = useUserContext();
  const contentId = props.post.bucket_content_id;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!supabase || !contentId) {
        return;
      }

      try {
        const { data: signedUrlData, error: signedUrlError } = await supabase
          .storage
          .from('user-posts')
          .createSignedUrl(`${props.post.clerk_user_id}/${contentId}`, 3600); // URL valid for 1 hour

        if (signedUrlError) {
          throw signedUrlError;
        }

        setImageUrl(signedUrlData.signedUrl);
        setError(null);
      } catch (err) {
        console.error('Error fetching image URL:', err);
        setError('Failed to load image');
      }
    }

    fetchImageUrl();
  }, [props, supabase, contentId]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!imageUrl) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading image...</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUrl }}
      style={styles.image}
      contentFit="contain"
      transition={1000}
      onError={(error) => {
        console.error('Image loading error:', error);
        setError('Failed to load image');
      }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorContainer: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f8d7da',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
    padding: 16,
  },
  loadingContainer: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});