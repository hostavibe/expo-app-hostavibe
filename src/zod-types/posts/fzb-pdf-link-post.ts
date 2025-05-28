import { z } from "zod";
import { FzbBasicPostDataSchema } from "./fzb-basic-post";


export const POST_TYPE_PDF_LINK = "pdf-link" as const;


export const FzbPdfLinkPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal(POST_TYPE_PDF_LINK),
  pdfUrl: z.string(),
});

export type FzbPdfLinkPostData = z.infer<typeof FzbPdfLinkPostDataSchema>;
