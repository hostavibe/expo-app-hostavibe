import { GridDimensionIdSchema } from "@/src/zod-types/boards/grid-dimensions";
import { FzbScreenConfigDataSchema } from "@/src/zod-types/screen-config/fzb-screen-config";
import { z } from "zod";


export const BOARD_TYPE_GRID_SCREEN = 'board-grid-screen';


export const FzbBoardGridScreenSchema = z.object({
  boardType: z.literal(BOARD_TYPE_GRID_SCREEN),
  gridDimensionsId: GridDimensionIdSchema,
  allScreenSettings: z.array(FzbScreenConfigDataSchema),
});


export type FzbBoardGridScreen = z.infer<typeof FzbBoardGridScreenSchema>;


export const FzbBoardGridScreenDefaultConfig = {
  boardType: BOARD_TYPE_GRID_SCREEN,
  gridDimensionsId: '1x1',
  allScreenSettings: Array(1).fill({
    screenType: 'show-permanent-blank',
  }),
} as FzbBoardGridScreen;
