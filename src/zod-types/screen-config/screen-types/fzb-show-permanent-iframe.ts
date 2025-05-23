import { z } from "zod";


export const SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IFRAME_LINK = 'show-permanent-iframe-link';


export const FzbScreenConfigShowPermanentIframeDataSchema = z.object({
  screenType: z.literal(SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IFRAME_LINK),
  iframeUrl: z.string(),
  backgroundColor: z.string().optional(),
});


export type FzbScreenConfigShowPermanentIframeData = z.infer<typeof FzbScreenConfigShowPermanentIframeDataSchema>;
