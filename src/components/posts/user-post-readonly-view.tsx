import { UserPostDetailsForId } from "@/src/api/types/user-post-details-for-id";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { UserPostImage } from "./user-post-image";


interface UserPostReadonlyViewProps {
  post: UserPostDetailsForId;
}

export const UserPostReadonlyView = (props: UserPostReadonlyViewProps) => {

  // const contentId = props.bucket_content_id;
  const caption = props.post.configuration_json;
  const createdAt = props.post.created_at;
  // const { supabase } = useUserContext();

  // const [imageUrl, setImageUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     if (!supabase || !contentId) {
  //       return;
  //     }

  //     const { data: signedUrlData, error: signedUrlError } = await supabase
  //       .storage
  //       .from('user-posts')
  //       .createSignedUrl(`${props.clerk_user_id}/${contentId}`, 3600); // URL valid for 1 hour

  //     if (signedUrlError){
  //       throw signedUrlError;
  //     }

  //     setImageUrl(signedUrlData.signedUrl);
  //   }

  //   fetchImageUrl();
  // }, [props, supabase, contentId]);


  return (
    <>
      <UserPostImage 
        post={props.post}
      />
      <View style={styles.captionContainer}>
          <ThemedText style={styles.caption}>{caption}</ThemedText>
      </View>
      <Text style={styles.date}>
        Created: {new Date(createdAt).toLocaleDateString()}
      </Text>
      
    </>
  )
}


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