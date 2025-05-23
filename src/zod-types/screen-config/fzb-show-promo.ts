import { z } from "zod";

export const SCREEN_CONFIG_TYPE_SHOW_PROMO = 'show-promo';


export const FzbScreenConfigShowPromoDataSchema = z.object({
  screenType: z.literal(SCREEN_CONFIG_TYPE_SHOW_PROMO),
});


export type FzbScreenConfigShowPromoData = z.infer<typeof FzbScreenConfigShowPromoDataSchema>;
