import { z } from "zod";
import { FzbBasicPostDataSchema, POST_TYPE_IFRAME_LINK } from "./fzb-basic-post";


export const FzbIframeLinkPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal(POST_TYPE_IFRAME_LINK),
  iframeUrl: z.string(),
});

export type FzbIframeLinkPostData = z.infer<typeof FzbIframeLinkPostDataSchema>;
