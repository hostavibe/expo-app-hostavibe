import { z } from "zod";


export const UserPostDetailsForIdSchema = z.object({
  id: z.string(),
  configuration_json: z.string(),
  bucket_content_id: z.string(),
  
  // caption: z.string(),
  // upload_filename: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  clerk_user_id: z.string(),
});

export type UserPostDetailsForId = z.infer<typeof UserPostDetailsForIdSchema>;
