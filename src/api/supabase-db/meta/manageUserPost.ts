import { POST_TYPE_IMAGE_LINK } from "@/src/zod-types/posts/fzb-basic-post";
import { FzbImageLinkPostData } from "@/src/zod-types/posts/fzb-image-link-post";
import { getContentType } from "@/utils/content-type";
import { FileOptions } from "@supabase/storage-js";
import { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';
import { NewUserPostDetails } from "../../types/user-post-details-for-id";
import { fetchMyUserPostById, USER_POSTS_BUCKET, USER_POSTS_TABLE } from "../user-posts";


export type ContentFileUpload = {
  contentFileBody: ArrayBuffer,
  contentFileOptions: FileOptions
}


const createUserPostContentPath = (userId: string) => {
  const newUuid = uuidv4();
  const uploadBucketPath = `${userId}/${newUuid}`;

  return uploadBucketPath;
}


export const uploadUserImagePost = async (
  supabase: SupabaseClient,
  userId: string,
  caption: string,
  backgroundColor: string,
  imageBlob: ArrayBuffer,
  imageExtension: string | null,
) => {

  const contentType = getContentType(imageExtension);

  const uploadBucketPath = createUserPostContentPath(userId);
  const uploadImageContentPath = `${uploadBucketPath}/1`;

  const contentFileUpload: ContentFileUpload = {
    contentFileBody: imageBlob,
    contentFileOptions: {
      contentType,
    }
  }

  const { data, error: uploadContentError } = await supabase
    .storage
    .from(USER_POSTS_BUCKET)
    .upload(uploadImageContentPath, contentFileUpload.contentFileBody, contentFileUpload.contentFileOptions);

  if (uploadContentError) {
    console.error('Storage upload error:', uploadContentError);
    throw uploadContentError;
  }
  
  const publicUrl = supabase
    .storage
    .from('user-posts')
    .getPublicUrl(uploadImageContentPath);

  const imageUrl = publicUrl.data.publicUrl;
  
  const postConfiguration: FzbImageLinkPostData = {
    postType: POST_TYPE_IMAGE_LINK,
    name: caption,
    imageUrl,
    backgroundColor,
  }

  const now = new Date().toISOString();

  const userPostData: NewUserPostDetails = {
    clerk_user_id: userId,
    created_at: now,
    updated_at: now,
    deleted_at: null,

    content_json: postConfiguration,
    content_bucket_path: uploadBucketPath,
    // content_type: POST_TYPE_IMAGE_LINK,
    // content_blob_url: data.fullPath,

    bucket_content_id: uploadBucketPath,
    configuration_json: caption,
  }

  // Save to database
  const { error: dbError } = await supabase
    .from(USER_POSTS_TABLE)
    .insert(userPostData);

  if (dbError) {
    console.error('Database insert error:', dbError);
    throw dbError;
  }

  return true;
}


export const deleteUserPost = async (
  supabase: SupabaseClient,
  postId: string,
) => {
  const postDetails = await fetchMyUserPostById(supabase, postId);

  if (!postDetails) {
    throw new Error('Post not found');
  }

  const { content_bucket_path: bucketPath } = postDetails;

  if (!bucketPath) {
    throw new Error('No bucket path found for post');
  }

  // List all files in the folder
  const { data: files, error: listError } = await supabase
    .storage
    .from(USER_POSTS_BUCKET)
    .list(bucketPath);

  if (listError) {
    console.error('Error listing files:', listError);
    throw listError;
  }

  // Delete all files in the folder
  if (files && files.length > 0) {
    const filePaths = files.map(file => `${bucketPath}/${file.name}`);
    const { error: deleteError } = await supabase
      .storage
      .from(USER_POSTS_BUCKET)
      .remove(filePaths);

    if (deleteError) {
      console.error('Error deleting files:', deleteError);
      throw deleteError;
    }
  }

  // Soft delete the database record
  const now = new Date().toISOString();
  const { error: dbError } = await supabase
    .from(USER_POSTS_TABLE)
    .update({ 
      is_deleted: true,
      deleted_at: now, 
    })
    .eq('id', postId);

  if (dbError) {
    console.error('Database update error:', dbError);
    throw dbError;
  }
}
