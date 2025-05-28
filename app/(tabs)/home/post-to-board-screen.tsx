import { fetchUserPostById } from "@/src/api/supabase-db/user-posts";
import { UserPostDetailsForId } from "@/src/api/types/user-post-details-for-id";
import { UserPostReadonlyView } from "@/src/components/posts/user-post-readonly-view";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useUserContext } from "@/src/hooks/user-context";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";


export const PostToBoardScreen = () => {
  const { postId, boardId } = useLocalSearchParams<{ 
    postId?: string;
    boardId?: string;
  }>();
  const { supabase } = useUserContext();
  const [post, setPost] = useState<UserPostDetailsForId | null>(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const SubmitButton = () => {
      return (
        <Button 
          title="Scan Board" 
          onPress={() => router.push({
            pathname: '/(tabs)/home/scan-for-board-id-screen',
            params: { 
              // boardId,
              postId,
             }
          })} 
        />
      );
    };

    navigation.setOptions({
      title: 'Post to Board',
      headerRight: SubmitButton,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!supabase || !postId) {
        return;
      }

      console.log("fetching post", postId);
      const post = await fetchUserPostById(supabase, postId as string);
      if (!post) {
        console.error('Post not found');
        return;
      }

      console.log('post', post);
      setPost(post);
    };

    fetchPost();
  }, [supabase, postId]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Post {postId} to Board {boardId} xxxx</ThemedText>
      
      {post && <UserPostReadonlyView post={post} />}

      {boardId && (
        <ThemedView style={styles.scannedContainer}>
          <ThemedText type="subtitle">Scanned Board QR Code:</ThemedText>
          <ThemedText>{boardId}</ThemedText>
          <Button 
            title="Scan Again" 
            onPress={() => router.push({
              pathname: '/(tabs)/home/scan-for-board-id-screen',
              params: { 
                boardId,
                postId,
               }
            })} 
          />
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  scannedContainer: {
    padding: 15,
    backgroundColor: 'rgba(161, 206, 220, 0.2)',
    borderRadius: 10,
    gap: 10,
  },
});

export default PostToBoardScreen;
