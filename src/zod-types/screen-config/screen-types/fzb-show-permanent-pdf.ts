import { z } from "zod";


export const SCREEN_CONFIG_TYPE_SHOW_PERMANENT_PDF_LINK = 'show-permanent-pdf-link';


export const FzbScreenConfigShowPermanentPdfDataSchema = z.object({
  screenType: z.literal(SCREEN_CONFIG_TYPE_SHOW_PERMANENT_PDF_LINK),
  pdfUrl: z.string(),
  backgroundColor: z.string().optional(),
});


export type FzbScreenConfigShowPermanentPdfData = z.infer<typeof FzbScreenConfigShowPermanentPdfDataSchema>;
