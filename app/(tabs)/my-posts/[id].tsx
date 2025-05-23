import { addUserBoardPostSubmission, UserBoardPostSubmissionAdd } from "@/src/api/supabase-db/board-post-submissions";
import { ThemedText } from "@/src/components/ThemedText";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import { useUserContext } from "@/src/hooks/user-context";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";

export const UserPostSchema = z.object({
  id: z.string(),
  configuration_json: z.string(),
  bucket_content_id: z.string(),
  
  // caption: z.string(),
  // upload_filename: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  clerk_user_id: z.string(),
});

export type UserPost = z.infer<typeof UserPostSchema>;

export const PostDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { supabase } = useUserContext();
  // const { setOnSave, setHasUnsavedChanges } = useSaveContext();
  const [post, setPost] = useState<UserPost | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCaption, setEditingCaption] = useState(false);
  const [tempCaption, setTempCaption] = useState('');
  const [submittedForBoardId, setSubmittedForBoardId] = useState<string | null>('c71ed0cd-843e-4587-9117-9179ca75d4b2');

  useEffect(() => {
    async function fetchPost() {
      if (!supabase) {
        return;
      }

      if (imageUrl) {
        return;
      }

      try {
        // Fetch post details
        const { data, error: fetchError } = await supabase
          .from('user_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        const validatedPost = UserPostSchema.parse(data);
        setPost(validatedPost);
        setTempCaption(validatedPost.configuration_json);

        // Get signed URL for the image
        const { data: signedUrlData, error: signedUrlError } = await supabase
          .storage
          .from('user-posts')
          .createSignedUrl(`${validatedPost.clerk_user_id}/${validatedPost.bucket_content_id}`, 3600); // URL valid for 1 hour

        if (signedUrlError){
          throw signedUrlError;
        }

        setImageUrl(signedUrlData.signedUrl);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post details');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, supabase, imageUrl]);

  const handleSave = async () => {
    if (!post || !supabase) return;

    try {
      const { error: updateError } = await supabase
        .from('user_posts')
        .update({
          caption: tempCaption,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) throw updateError;

      setPost(prev => prev ? { ...prev, caption: tempCaption } : null);
      setEditingCaption(false);
      // setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const handleCaptionChange = (text: string) => {
    setTempCaption(text);
    // setHasUnsavedChanges(true);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post not found</Text>
      </View>
    );
  }

  const handleSubmitToBoard = async () => {
    console.log('submit to board');
    if (!supabase || !submittedForBoardId) {
      return;
    }

    const boardPostSubmission: UserBoardPostSubmissionAdd = {
      submitted_user_post_id: post.id,
      submitted_for_board_id: submittedForBoardId,
    }

    const result = await addUserBoardPostSubmission(supabase, boardPostSubmission);
    console.log('result', result);    
  }

  return (
    <View style={styles.container}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <View style={styles.captionContainer}>
        {editingCaption ? (
          <TextInput
            style={styles.input}
            value={tempCaption}
            onChangeText={handleCaptionChange}
            onBlur={() => setEditingCaption(false)}
            autoFocus
          />
        ) : (
          <ThemedText style={styles.caption}>{post.configuration_json}</ThemedText>
        )}
        <Pressable onPress={() => setEditingCaption(true)} style={styles.editButton}>
          <IconSymbol name="pencil.circle" size={20} color="#666" />
        </Pressable>
      </View>
      <Text style={styles.date}>
        Created: {new Date(post.created_at).toLocaleDateString()}
      </Text>

      <Text>Board ID: {submittedForBoardId}</Text>

      <Button title="Submit to Board" onPress={handleSubmitToBoard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  editButton: {
    padding: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default PostDetailsScreen;
