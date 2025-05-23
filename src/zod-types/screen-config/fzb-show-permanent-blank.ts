import { z } from "zod";

export const SCREEN_CONFIG_TYPE_SHOW_PERMANENT_BLANK = 'show-permanent-blank';


export const FzbScreenConfigShowPermanentBlankDataSchema = z.object({
  screenType: z.literal(SCREEN_CONFIG_TYPE_SHOW_PERMANENT_BLANK),
});


export type FzbScreenConfigShowPermanentBlankData = z.infer<typeof FzbScreenConfigShowPermanentBlankDataSchema>;
