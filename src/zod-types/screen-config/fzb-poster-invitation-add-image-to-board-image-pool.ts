import { z } from "zod";


export const SCREEN_CONFIG_TYPE_POSTER_INVITATION_ADD_IMAGE_TO_BOARD_IMAGE_POOL = 'poster-invitation-add-image-to-board-image-pool';

export const FzbScreenConfigPosterInvitationAddImageToBoardImagePoolDataSchema = z.object({
  screenType: z.literal(SCREEN_CONFIG_TYPE_POSTER_INVITATION_ADD_IMAGE_TO_BOARD_IMAGE_POOL),
});


export type FzbScreenConfigPosterInvitationAddImageToBoardImagePoolData = z.infer<typeof FzbScreenConfigPosterInvitationAddImageToBoardImagePoolDataSchema>;
