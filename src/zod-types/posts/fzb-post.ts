import { z } from "zod";
import { FzbIframeLinkPostDataSchema } from "./fzb-iframe-link-post";
import { FzbImageLinkPostDataSchema } from "./fzb-image-link-post";
import { FzbTextContentPostDataSchema } from "./fzb-text-content-post";
import { FzbUrlQrcodeWithCaptionPostDataSchema } from "./fzb-url-qrcode-with-caption";


export const FzbPostDataSchema = z.discriminatedUnion("postType", [
  FzbImageLinkPostDataSchema,
  FzbTextContentPostDataSchema,
  FzbIframeLinkPostDataSchema,
  FzbUrlQrcodeWithCaptionPostDataSchema,
  // embedded video post
  // PDF view post
  // 
]);

export type FzbPostData = z.infer<typeof FzbPostDataSchema>;
