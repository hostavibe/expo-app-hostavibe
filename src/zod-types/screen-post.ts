import { z } from "zod";
import { FzbScreenIdSchema } from "./branded-strings/fb-branded-strings";
import { FzbPostDataSchema } from "./posts/fzb-post";


export const ScreenPostSchema = z.object({
  screenId: FzbScreenIdSchema,
  postData: FzbPostDataSchema.nullable(),
});

export type ScreenPost = z.infer<typeof ScreenPostSchema>;
