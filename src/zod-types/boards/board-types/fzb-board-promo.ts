import { FzbScreenConfigShowPromoDataSchema, SCREEN_CONFIG_TYPE_SHOW_PROMO } from "@/src/zod-types/screen-config/fzb-show-promo";
import { z } from "zod";
import { FzbBoardBaseSchema } from "./fzb-board-base";


export const BOARD_TYPE_PROMO = 'board-promo';


export const FzbBoardPromoSchema = FzbBoardBaseSchema.extend({
  boardType: z.literal(BOARD_TYPE_PROMO),
  screenConfig: FzbScreenConfigShowPromoDataSchema,
});


export type FzbBoardPromo = z.infer<typeof FzbBoardPromoSchema>;

export const FzbBoardPromoDefaultConfig = {
  boardType: BOARD_TYPE_PROMO,
  screenConfig: {
    screenType: SCREEN_CONFIG_TYPE_SHOW_PROMO,
  },
} as FzbBoardPromo;

