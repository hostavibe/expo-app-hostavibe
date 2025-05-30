import { autoPostToBoard } from "@/src/api/supabase-db/meta/autoPost";
import { canIPostToBoardWithoutRequiringApproval } from "@/src/api/supabase-db/meta/bizAuth";
import { submitPostForReview } from "@/src/api/supabase-db/meta/submitPost";
import { fetchMyUserPostById } from "@/src/api/supabase-db/user-posts";
import { UserPostDetailsForId } from "@/src/api/types/user-post-details-for-id";
import { UserPostReadonlyView } from "@/src/components/posts/user-post-readonly-view";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { useUserContext } from "@/src/hooks/user-context";
import { BoardIdentifiers, convertBoardIdStringToIdentifiers } from "@/src/zod-types/branded-strings/board-id";
import { useUser } from "@clerk/clerk-expo";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";


export const PostToBoardScreen = () => {
  const { postId, boardId } = useLocalSearchParams<{ 
    postId?: string;
    boardId?: string;
  }>();

  const { supabase } = useUserContext();
  const { user } = useUser();
  const [post, setPost] = useState<UserPostDetailsForId | null>(null);
  const navigation = useNavigation();

  const [validBoardIdentifiers, setValidBoardIdentifiers] = useState<BoardIdentifiers | null>(null);
  const [autopostAllowed, setAutopostAllowed] = useState<boolean>(false);


  useEffect(() => {

    const fetchBoardConfig = async () => {
      if (!supabase || !boardId) {
        return;
      }

      const boardIdentifiers = convertBoardIdStringToIdentifiers(boardId);
      setValidBoardIdentifiers(boardIdentifiers);

      const ok = await canIPostToBoardWithoutRequiringApproval(supabase, boardIdentifiers);
      setAutopostAllowed(ok);
    }

    fetchBoardConfig();
  }, [supabase, boardId]);

  useLayoutEffect(() => {

    const uploadTitle = autopostAllowed ? 'Post' : 'Submit';

    const doUploadAction = async () => {
      if (!validBoardIdentifiers || !postId) {
        console.error('doUploadAction: Invalid board identifiers or post id');
        return;
      }

      if (!user) {
        console.error('doUploadAction: User not found');
        return;
      }

      const timeToExpirationInSeconds = 60 * 60 * 24 * 7; // 7 days
      const userId = user.id;

      if (autopostAllowed) {
        await autoPostToBoard(supabase, validBoardIdentifiers, postId);
      } else {
        await submitPostForReview(supabase, validBoardIdentifiers, postId, userId, timeToExpirationInSeconds);
      }
    }

    const ScanAndPostHeaderSection = () => {
      return (
        <View style={styles.headerRightContainer}>
          <Button 
            title={uploadTitle} 
            disabled={!postId || !validBoardIdentifiers}
            onPress={doUploadAction} 
          />
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
        </View>
      );
    };

    navigation.setOptions({
      title: 'Post to Board',
      headerRight: ScanAndPostHeaderSection,
    });
  }, [supabase, user, navigation, postId, boardId, autopostAllowed, validBoardIdentifiers]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!supabase || !postId) {
        return;
      }

      console.log("fetching post", postId);
      const post = await fetchMyUserPostById(supabase, postId as string);
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
  headerRightContainer: {
    flexDirection: 'row',
    gap: 10,
  },
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
