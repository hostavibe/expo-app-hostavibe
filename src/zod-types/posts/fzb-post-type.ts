import { z } from "zod";


export const FzbPostTypeSchema = z.object({
  postType: z.string(),
});

export type FzbPostType = z.infer<typeof FzbPostTypeSchema>;
