import { SupabaseClient } from "@supabase/supabase-js";
import { UserPostDetailsForId, UserPostDetailsForIdSchema } from "../types/user-post-details-for-id";


export const USER_POSTS_TABLE = 'user_posts';
export const USER_POSTS_BUCKET = 'user-posts';


export const fetchMyUserPosts = async (supabase: SupabaseClient): Promise<UserPostDetailsForId[] | null> => {
  if (!supabase) {
    console.error('No supabase client');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from(USER_POSTS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const validatedPosts = data
      ?.map(post => UserPostDetailsForIdSchema.parse(post))
      .filter(post => post !== undefined);
      
    return validatedPosts;

  } catch (err) {
    console.error('Error fetching user posts:', err);
    throw err;
  }
}


export const fetchMyUserPostById = async (supabase: SupabaseClient, id: string): Promise<UserPostDetailsForId | null> => {
  if (!supabase) {
    return null;
  }

  try {
    // Fetch post details
    const { data, error: fetchError } = await supabase
      .from(USER_POSTS_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError){
      throw fetchError;
    }

    const validatedPost = UserPostDetailsForIdSchema.parse(data);
    return validatedPost;

  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
