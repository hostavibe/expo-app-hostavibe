import { BOARD_TYPE_GRID_SCREEN, FzbBoardGridScreenDefaultConfig } from "./fzb-board-grid-screen";
import { BOARD_TYPE_PROMO, FzbBoardPromoDefaultConfig } from "./fzb-board-promo";
import { BOARD_TYPE_SINGLE_SCREEN, FzbBoardSingleScreenDefaultConfig } from "./fzb-board-single-screen";


export const FzbBoardDefaultConfigurations = {
  [BOARD_TYPE_SINGLE_SCREEN]: FzbBoardSingleScreenDefaultConfig,
  [BOARD_TYPE_GRID_SCREEN]: FzbBoardGridScreenDefaultConfig,
  [BOARD_TYPE_PROMO]: FzbBoardPromoDefaultConfig,
} as const;
