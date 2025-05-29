import { z } from "zod";
import { FzbIframeLinkPostDataSchema } from "./fzb-iframe-link-post";
import { FzbImageLinkPostDataSchema } from "./fzb-image-link-post";
import { FzbPdfLinkPostDataSchema } from "./fzb-pdf-link-post";
import { FzbTextContentPostDataSchema } from "./fzb-text-content-post";
import { FzbUrlQrcodeWithCaptionPostDataSchema } from "./fzb-url-qrcode-with-caption";


export const AllFzbPostTypes = [
  FzbImageLinkPostDataSchema,
  FzbTextContentPostDataSchema,
  FzbIframeLinkPostDataSchema,
  FzbUrlQrcodeWithCaptionPostDataSchema,
  FzbPdfLinkPostDataSchema,
] as const;


export const FzbPostTypesSchema = z.union(AllFzbPostTypes);

export const FzbPostDataSchema = z.discriminatedUnion("postType", AllFzbPostTypes);

export type FzbPostData = z.infer<typeof FzbPostDataSchema>;
