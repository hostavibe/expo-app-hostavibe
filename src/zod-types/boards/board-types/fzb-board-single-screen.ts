import { FzbScreenConfigDataSchema } from "@/src/zod-types/screen-config/fzb-screen-config";
import { z } from "zod";
import { FzbBoardBaseSchema } from "./fzb-board-base";


export const BOARD_TYPE_SINGLE_SCREEN = 'board-single-screen';


export const FzbBoardSingleScreenSchema = FzbBoardBaseSchema.extend({
  boardType: z.literal(BOARD_TYPE_SINGLE_SCREEN),
  screenConfig: FzbScreenConfigDataSchema,
});


export type FzbBoardSingleScreen = z.infer<typeof FzbBoardSingleScreenSchema>;

export const FzbBoardSingleScreenDefaultConfig = {
  boardType: BOARD_TYPE_SINGLE_SCREEN,
  screenConfig: {
    screenType: 'show-permanent-blank',
  },
} as FzbBoardSingleScreen;

