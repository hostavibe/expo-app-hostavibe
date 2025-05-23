import { z } from "zod";
import { FzbScreenConfigPosterInvitationAddImageToBoardImagePoolDataSchema } from "./fzb-poster-invitation-add-image-to-board-image-pool";
import { FzbScreenConfigPosterPlacedScreenImageDataSchema } from "./fzb-poster-placed-screen-image";
import { FzbScreenConfigShowImageFromMyPostsDataSchema } from "./fzb-show-image-from-my-posts";
import { FzbScreenConfigShowPermanentBlankDataSchema } from "./fzb-show-permanent-blank";
import { FzbScreenConfigShowPermanentIframeDataSchema } from "./fzb-show-permanent-iframe";
import { FzbScreenConfigShowPermanentImageDataSchema } from "./fzb-show-permanent-image";
import { FzbScreenConfigShowPermanentPdfDataSchema } from "./fzb-show-permanent-pdf";
import { FzbScreenConfigShowPromoDataSchema } from "./fzb-show-promo";


export const FzbScreenConfigDataSchema = z.discriminatedUnion("screenType", [
  FzbScreenConfigShowPermanentBlankDataSchema,
  FzbScreenConfigShowPermanentImageDataSchema,
  FzbScreenConfigShowPermanentPdfDataSchema,
  FzbScreenConfigShowPermanentIframeDataSchema,
  FzbScreenConfigShowPromoDataSchema,
  
  FzbScreenConfigPosterPlacedScreenImageDataSchema,

  FzbScreenConfigShowImageFromMyPostsDataSchema,
  FzbScreenConfigPosterInvitationAddImageToBoardImagePoolDataSchema,
]);


export type FzbScreenConfigData = z.infer<typeof FzbScreenConfigDataSchema>;
