import { z } from "zod";
import { FzbBasicPostDataSchema, POST_TYPE_PDF_LINK } from "./fzb-basic-post";


export const FzbPdfLinkPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal(POST_TYPE_PDF_LINK),
  pdfUrl: z.string(),
});

export type FzbPdfLinkPostData = z.infer<typeof FzbPdfLinkPostDataSchema>;
