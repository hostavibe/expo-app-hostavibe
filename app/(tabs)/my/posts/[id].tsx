import { UserPostDetailsForId } from "@/src/api/types/user-post-details-for-id";
import { UserPostDetailsForIdComponent } from "@/src/components/posts/user-post-details-for-id";
import { SupabaseClient } from "@supabase/supabase-js";
import { router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, View } from "react-native";


export const PostDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const postId = id as string;

  const handlePostToBoard = async () => {
    console.log('post to board');

    router.push({
      pathname: '/home/post-to-board-screen',
      params: {
        postId,
      },
    });
  }

  
  const handleSave = async (supabase: SupabaseClient, updatedPost: UserPostDetailsForId) => {
    if (!updatedPost || !supabase) return;

    try {
      const { error: updateError } = await supabase
        .from('user_posts')
        .update({
          caption: updatedPost.configuration_json,
          updated_at: new Date().toISOString(),
        })
        .eq('id', postId);

      if (updateError) {
        throw updateError;
      }

    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  return (
    <View style={styles.container}>
      {
        postId && 
          <UserPostDetailsForIdComponent
            postId={postId}
            editModeDetails={{
              onSave: handleSave,
            }}
          />
      }

      <Button title="Post to Board" onPress={handlePostToBoard} />
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
