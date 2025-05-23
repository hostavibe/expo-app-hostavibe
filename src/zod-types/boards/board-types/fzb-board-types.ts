import { z } from "zod";
import { BOARD_TYPE_GRID_SCREEN, FzbBoardGridScreenSchema } from "./fzb-board-grid-screen";
import { BOARD_TYPE_PROMO, FzbBoardPromoSchema } from "./fzb-board-promo";
import { BOARD_TYPE_SINGLE_SCREEN, FzbBoardSingleScreenSchema } from "./fzb-board-single-screen";


export const FzbBoardTypesSchema = z.discriminatedUnion("boardType", [
  FzbBoardPromoSchema,
  FzbBoardSingleScreenSchema,
  FzbBoardGridScreenSchema,
]);


export type FzbBoardTypes = z.infer<typeof FzbBoardTypesSchema>;


export const BOARD_TYPE_OPTIONS: Record<FzbBoardTypes['boardType'], string> = {
  [BOARD_TYPE_PROMO]: "Promo",
  [BOARD_TYPE_SINGLE_SCREEN]: "Single Screen",
  [BOARD_TYPE_GRID_SCREEN]: "Grid Screen",
} as const;
