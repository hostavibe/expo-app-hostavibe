import { z } from "zod";
import { FzbBasicPostDataSchema, POST_TYPE_TEXT_CONTENT } from "./fzb-basic-post";


export const FzbTextContentPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal(POST_TYPE_TEXT_CONTENT),
  textContent: z.string(),
});

export type FzbTextContentPostData = z.infer<typeof FzbTextContentPostDataSchema>;
