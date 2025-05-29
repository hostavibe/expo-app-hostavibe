import { fetchMyUserPostById } from "@/src/api/supabase-db/user-posts";
import { UserPostDetailsForId } from "@/src/api/types/user-post-details-for-id";
import { useUserContext } from "@/src/hooks/user-context";
import { useEffect, useState } from "react";
import { EditModeDetails, UserPostEditView } from "./user-post-edit-view";
import { UserPostReadonlyView } from "./user-post-readonly-view";


interface UserPostDetailsForIdComponentProps {
  postId: string;
  editModeDetails?: EditModeDetails;
}

export const UserPostDetailsForIdComponent = (props: UserPostDetailsForIdComponentProps) => {
  const { postId, editModeDetails } = props;

  const { supabase } = useUserContext();

  const [post, setPost] = useState<UserPostDetailsForId | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchPost() {
      if (!supabase) {
        return;
      }

      try {
        const post = await fetchMyUserPostById(supabase, postId);
        if (!post) {
          setError('Post not found');
          return;
        }

        setPost(post);

        // Get signed URL for the image
        const { data: signedUrlData, error: signedUrlError } = await supabase
          .storage
          .from('user-posts')
          .createSignedUrl(`${post.clerk_user_id}/${post.bucket_content_id}`, 3600); // URL valid for 1 hour

        if (signedUrlError){
          throw signedUrlError;
        }

        setImageUrl(signedUrlData.signedUrl);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post details');
      }
    }

    fetchPost();
  }, [postId, supabase, imageUrl]);

  if (!post) {
    return null;
  }

  if (editModeDetails) {
    return (
      <UserPostEditView
        post={post}
        editModeDetails={editModeDetails}
      />
    )
  }

  return (
    <UserPostReadonlyView
      post={post}
    />
  )
}


  // // const { setOnSave, setHasUnsavedChanges } = useSaveContext();
  // const [post, setPost] = useState<UserPostDetailsForId | null>(null);
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [editingCaption, setEditingCaption] = useState(false);
  // const [tempCaption, setTempCaption] = useState('');
  // const [submittedForBoardId, setSubmittedForBoardId] = useState<string | null>('c71ed0cd-843e-4587-9117-9179ca75d4b2');

  // useEffect(() => {
  //   async function fetchPost() {
  //     if (!supabase) {
  //       return;
  //     }

  //     if (imageUrl) {
  //       return;
  //     }

  //     try {
  //       const post = await fetchUserPostById(supabase, postId);
  //       if (!post) {
  //         setError('Post not found');
  //         return;
  //       }

  //       setPost(post);
  //       setTempCaption(post.configuration_json);

  //       // Get signed URL for the image
  //       const { data: signedUrlData, error: signedUrlError } = await supabase
  //         .storage
  //         .from('user-posts')
  //         .createSignedUrl(`${post.clerk_user_id}/${post.bucket_content_id}`, 3600); // URL valid for 1 hour

  //       if (signedUrlError){
  //         throw signedUrlError;
  //       }

  //       setImageUrl(signedUrlData.signedUrl);
  //     } catch (err) {
  //       console.error('Error fetching post:', err);
  //       setError('Failed to load post details');
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchPost();
  // }, [postId, supabase, imageUrl]);

  // const handleSave = async () => {
  //   if (!post || !supabase) return;

  //   try {
  //     const { error: updateError } = await supabase
  //       .from('user_posts')
  //       .update({
  //         caption: tempCaption,
  //         updated_at: new Date().toISOString(),
  //       })
  //       .eq('id', postId);

  //     if (updateError) throw updateError;

  //     setPost(prev => prev ? { ...prev, caption: tempCaption } : null);
  //     setEditingCaption(false);
  //     // setHasUnsavedChanges(false);
  //   } catch (err) {
  //     console.error('Error updating post:', err);
  //   }
  // };

  // const handleCaptionChange = (text: string) => {
  //   setTempCaption(text);
  //   // setHasUnsavedChanges(true);
  // };

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.error}>{error}</Text>
  //     </View>
  //   );
  // }

  // if (!post) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Post not found</Text>
  //     </View>
  //   );
  // }
  

  // return (
  //   <View>
  //     <Text>User Post Details</Text>
  //   </View>
  // )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: 300,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   captionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   caption: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//   },
//   input: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8,
//     marginRight: 8,
//   },
//   editButton: {
//     padding: 4,
//   },
//   date: {
//     fontSize: 14,
//     color: '#666',
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//   },
// });
