import { FzbPostDataSchema } from "@/src/zod-types/posts/fzb-post";
import { z } from "zod";


export const NewPostSubmissionToUserBoardSchema = z.object({
  submitting_user_id: z.string(),
  submitted_user_post_id: z.string(),
  submitted_board4user_id: z.string(),

  content_json: FzbPostDataSchema,
  content_urls_jsonarray: z.array(z.string()),

  submission_expires_at: z.string().datetime(),
});

export type NewPostSubmissionToUserBoard = z.infer<typeof NewPostSubmissionToUserBoardSchema>;

export const PostSubmissionToUserBoardSchema = NewPostSubmissionToUserBoardSchema.extend({
  id: z.string(),
  submitted_at: z.string().datetime(),
});

export type PostSubmissionToUserBoard = z.infer<typeof PostSubmissionToUserBoardSchema>;
