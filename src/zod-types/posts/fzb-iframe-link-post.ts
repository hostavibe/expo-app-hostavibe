import { z } from "zod";
import { FzbBasicPostDataSchema } from "./fzb-basic-post";

export const POST_TYPE_IFRAME_LINK = "iframe-link" as const;


export const FzbIframeLinkPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal(POST_TYPE_IFRAME_LINK),
  iframeUrl: z.string(),
});

export type FzbIframeLinkPostData = z.infer<typeof FzbIframeLinkPostDataSchema>;
