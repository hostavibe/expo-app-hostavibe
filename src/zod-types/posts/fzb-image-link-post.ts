import { z } from "zod";
import { FzbBasicPostDataSchema } from "./fzb-basic-post";


export const POST_TYPE_IMAGE_LINK = "image-link" as const;


export const FzbImageLinkPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal(POST_TYPE_IMAGE_LINK),
  imageUrl: z.string(),
  backgroundColor: z.string(),
});

export type FzbImageLinkPostData = z.infer<typeof FzbImageLinkPostDataSchema>;