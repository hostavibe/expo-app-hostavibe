import { ThemedText } from '@/src/components/ThemedText';
import { useUserContext } from '@/src/hooks/user-context';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { UserPost, UserPostSchema } from './[id]';


// const UserPostSchema = z.object({
//   id: z.string(),
//   caption: z.string(),
//   upload_filename: z.string(),
//   created_at: z.string(),
//   updated_at: z.string(),
// });

// type UserPost = z.infer<typeof UserPostSchema>;


export const MyPostsScreen = () => {
  
  const [userPosts, setUserPosts] = useState<UserPost[]>([]);
  const { supabase, isUserLoaded } = useUserContext();

  
  useEffect(() => {
    async function fetchUserPosts() {
      if (!supabase || !isUserLoaded) {
        return;
      }

      console.log("supabase", supabase);

      try {
        const { data, error } = await supabase
          .from('user_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        const validatedPosts = data
          ?.map(post => UserPostSchema.parse(post))
          .filter(post => post !== undefined);
        setUserPosts(validatedPosts);
      } catch (err) {
        console.error('Error fetching user posts:', err);
      }
    }

    fetchUserPosts();
  }, [supabase, isUserLoaded]);
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/my-posts/new')}
          // disabled={uploading}
        >
          <ThemedText style={styles.addButtonText}>New Post</ThemedText>
        </Pressable>
      </View>

      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/my-posts/${item.id}` as any)}
            style={styles.configItem}
          >
            <ThemedText type="title">{item.configuration_json}</ThemedText>
            <ThemedText style={styles.date}>
              Created: {new Date(item.created_at).toLocaleDateString()}
            </ThemedText>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              No posts found
            </ThemedText>
          </View>
        }
        scrollEnabled={false}
      />
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
  configItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
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
    color: 'white',
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
  date: {
    marginTop: 8,
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
}); 