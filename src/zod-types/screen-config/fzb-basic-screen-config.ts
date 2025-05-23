import { z } from "zod";
import { FzbScreenConfigTypeSchema } from "../branded-strings/fb-branded-strings";
import { SCREEN_CONFIG_TYPE_POSTER_INVITATION_ADD_IMAGE_TO_BOARD_IMAGE_POOL } from "./fzb-poster-invitation-add-image-to-board-image-pool";
import { SCREEN_CONFIG_TYPE_POSTER_PLACED_SCREEN_IMAGE } from "./fzb-poster-placed-screen-image";
import { SCREEN_CONFIG_TYPE_SHOW_IMAGE_FROM_MY_POSTS } from "./fzb-show-image-from-my-posts";
import { SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IMAGE_LINK } from "./fzb-show-permanent-image";


export const FzbScreenConfigDataTypeBrandKey = 'FzbScreenConfigDataType';


export const FzbScreenConfigDataTypeValues = [
  z.literal(SCREEN_CONFIG_TYPE_SHOW_PERMANENT_IMAGE_LINK),
  z.literal(SCREEN_CONFIG_TYPE_SHOW_IMAGE_FROM_MY_POSTS),
  z.literal(SCREEN_CONFIG_TYPE_POSTER_INVITATION_ADD_IMAGE_TO_BOARD_IMAGE_POOL),
  z.literal(SCREEN_CONFIG_TYPE_POSTER_PLACED_SCREEN_IMAGE),
] as const;

export type FzbScreenConfigDataTypeValues = typeof FzbScreenConfigDataTypeValues[number];


export const FzbScreenConfigDataTypeUnion = z.union(FzbScreenConfigDataTypeValues);

export type FzbScreenConfigDataType = z.infer<typeof FzbScreenConfigDataTypeUnion>;


export const FzbBasicScreenConfigDataSchema = z.object({
  screenConfigType: FzbScreenConfigTypeSchema,
});

export type FzbBasicScreenConfigData = z.infer<typeof FzbBasicScreenConfigDataSchema>;
