import { z } from "zod";


export const SCREEN_CONFIG_TYPE_POSTER_PLACED_SCREEN_IMAGE = 'poster-placed-screen-image';

export const PosterPlaceScreenImageInvitationParametersSchema = z.object({
  screenType: z.literal('text-wrapped'),
  aboveQrCodeText: z.string().optional(),
  belowQrCodeText: z.string().optional(),
  backgroundImageUrl: z.string().optional(),
  backgroundColor: z.string().optional(),
  demoUserId: z.string(),
});

export type PosterPlaceScreenImageInvitationParameters = z.infer<typeof PosterPlaceScreenImageInvitationParametersSchema>;

export const FzbScreenConfigPosterPlacedScreenImageDataSchema = z.object({
  screenType: z.literal(SCREEN_CONFIG_TYPE_POSTER_PLACED_SCREEN_IMAGE),
  invitationParameters: PosterPlaceScreenImageInvitationParametersSchema.optional(),
});


export type FzbScreenConfigPosterPlacedScreenImageData = z.infer<typeof FzbScreenConfigPosterPlacedScreenImageDataSchema>;