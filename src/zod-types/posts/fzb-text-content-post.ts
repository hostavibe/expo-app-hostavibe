import { z } from "zod";
import { FzbBasicPostDataSchema } from "./fzb-basic-post";


export const POST_TYPE_TEXT_CONTENT = "text-content" as const;


export const FzbTextContentPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal(POST_TYPE_TEXT_CONTENT),
  textContent: z.string(),
});

export type FzbTextContentPostData = z.infer<typeof FzbTextContentPostDataSchema>;
