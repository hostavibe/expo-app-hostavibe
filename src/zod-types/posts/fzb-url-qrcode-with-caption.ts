import { z } from "zod";
import { FzbBasicPostDataSchema, POST_TYPE_URL_QRCODE_WITH_CAPTION } from "./fzb-basic-post";


export const FzbUrlQrcodeWithCaptionPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal(POST_TYPE_URL_QRCODE_WITH_CAPTION),
  url: z.string(),
  caption: z.string(),
});

export type FzbUrlQrcodeWithCaptionPostData = z.infer<typeof FzbUrlQrcodeWithCaptionPostDataSchema>;
