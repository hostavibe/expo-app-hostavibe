import { deleteUserPost } from '@/src/api/supabase-db/meta/manageUserPost';
import { fetchMyUserPosts } from '@/src/api/supabase-db/user-posts';
import { UserPostDetailsForId } from '@/src/api/types/user-post-details-for-id';
import { ThemedText } from '@/src/components/ThemedText';
import { useUserContext } from '@/src/hooks/user-context';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';


export const MyPostsScreen = () => {
  
  const [userPosts, setUserPosts] = useState<UserPostDetailsForId[]>([]);
  const { supabase, isUserLoaded } = useUserContext();

  
  useEffect(() => {
    const fetchUserPosts = async () => {

      try {
        const posts = await fetchMyUserPosts(supabase);
        if (posts) {
          setUserPosts(posts);
        }
      } catch (err) {
        console.error('Error fetching user posts:', err);
      }
    }

    fetchUserPosts();
  }, [supabase, isUserLoaded]);
  

  const handleDelete = async (postId: string) => {
    console.log('Deleting post:', postId);
    const isConfirmed = Platform.OS === 'web' 
      ? window.confirm('Are you sure you want to delete this post?')
      : await new Promise<boolean>((resolve) => {
          Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => resolve(false),
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => resolve(true),
              },
            ],
            { cancelable: true }
          );
        });

    if (isConfirmed) {
      try {
        await deleteUserPost(supabase, postId);

        setUserPosts(posts => posts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Error deleting post:', err);
        if (Platform.OS === 'web') {
          window.alert('Failed to delete post');
        } else {
          Alert.alert('Error', 'Failed to delete post');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/(tabs)/my/posts/new2')}
          // disabled={uploading}
        >
          <ThemedText style={styles.addButtonText}>New Post2</ThemedText>
        </Pressable>
      </View>

      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({
              pathname: '/my/posts/[id]',
              params: {
                id: item.id,
              },
            })}
            style={styles.configItem}
          >
            <View style={styles.configItemContent}>
              <ThemedText type="title">{item.configuration_json}</ThemedText>
              <ThemedText style={styles.date}>
                Created: {new Date(item.created_at).toLocaleDateString()}
              </ThemedText>
            </View>
            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}
              style={styles.deleteButton}
            >
              <ThemedText style={styles.deleteButtonText}>Delete</ThemedText>
            </Pressable>
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
  configItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  configItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  configItemContent: {
    flex: 1,
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
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
}); 