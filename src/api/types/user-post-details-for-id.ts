import { FzbPostDataSchema } from "@/src/zod-types/posts/fzb-post";
import { z } from "zod";


export const NewUserPostDetailsSchema = z.object({
  clerk_user_id: z.string(),

  configuration_json: z.string(),
  bucket_content_id: z.string(),

  // content_type: FzbPostTypeEnumSchema.nullable(),
  content_json: FzbPostDataSchema.nullable(),
  content_bucket_path: z.string().nullable(),
  // content_blob_url: z.string().nullable(),
  
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullable(),
});

export type NewUserPostDetails = z.infer<typeof NewUserPostDetailsSchema>;


export const UserPostDetailsForIdSchema = NewUserPostDetailsSchema.extend({
  id: z.string(),
});

export type UserPostDetailsForId = z.infer<typeof UserPostDetailsForIdSchema>;

