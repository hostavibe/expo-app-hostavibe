import { z } from "zod";


export const SCREEN_CONFIG_TYPE_SHOW_IMAGE_FROM_MY_POSTS = 'show-image-from-my-posts';

export const FzbScreenConfigShowImageFromMyPostsDataSchema = z.object({
  screenType: z.literal(SCREEN_CONFIG_TYPE_SHOW_IMAGE_FROM_MY_POSTS),
});


export type FzbScreenConfigShowImageFromMyPostsData = z.infer<typeof FzbScreenConfigShowImageFromMyPostsDataSchema>;