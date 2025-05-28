import { UserBoardPostSubmissionAdd, addUserBoardPostSubmission } from "@/src/api/supabase-db/board-post-submissions";
import { fetchUserPostById } from "@/src/api/supabase-db/user-posts";
import { UserPostDetailsForId, UserPostDetailsForIdSchema } from "@/src/api/types/user-post-details-for-id";
import { UserPostReadonlyView } from "@/src/components/posts/user-post-readonly-view";
import { useUserContext } from "@/src/hooks/user-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Text, View } from "react-native";


export const PostToMyBoardScreen = () => {

  const { postId, boardId } = useLocalSearchParams();
  const { supabase } = useUserContext();
  const [post, setPost] = useState<UserPostDetailsForId | null>(null);

  const navigation = useNavigation();

  useLayoutEffect(() => {

    const SubmitButton = () => {
      return (
        <Button title="Scan Board" onPress={() => console.log('scan board')} />
      )
    }

    navigation.setOptions({
      title: 'Post to Board',
      headerRight: SubmitButton,
    });
  }, [navigation]);

  const doPost = async () => {
    if (!supabase || !postId || !boardId) {
      return;
    }

    console.log('doPost', postId, boardId);
    const boardPostSubmission: UserBoardPostSubmissionAdd = {
      submitted_user_post_id: postId as string,
      submitted_board4user_id: boardId as string,
    }

    const result = await addUserBoardPostSubmission(supabase, boardPostSubmission);
    console.log('result', result);    

    const postResult = UserPostDetailsForIdSchema.safeParse(result);
    if (!postResult.success) {
      console.error('Invalid post', postResult.error);
      return;
    }

    setPost(postResult.data);
  }

  useEffect(() => {
    console.log('fetchPost', postId, boardId);

    const fetchPost = async () => {
      if (!supabase || !postId || !boardId) {
        return;
      }

      const post = await fetchUserPostById(supabase, postId as string);
      if (!post) {
        // setError('Post not found');
        console.error('Post not found');
        return;
      }

      console.log('post', post);
      setPost(post);
    }

    fetchPost();
  }, [supabase, postId, boardId]);

  return (
    <View>
      <Text>Post {postId} to Board {boardId}</Text>
      {
        post && 
          <UserPostReadonlyView
            post={post}
          />
      }
    </View>
  )
}
