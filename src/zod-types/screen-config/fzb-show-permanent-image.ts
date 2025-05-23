import { z } from "zod";


export const SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IMAGE_LINK = 'show-permanent-image-link';


export const FzbScreenConfigShowPermanentImageDataSchema = z.object({
  screenType: z.literal(SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IMAGE_LINK),
  imageUrl: z.string(),
  backgroundColor: z.string(),
});


export type FzbScreenConfigShowPermanentImageData = z.infer<typeof FzbScreenConfigShowPermanentImageDataSchema>;
