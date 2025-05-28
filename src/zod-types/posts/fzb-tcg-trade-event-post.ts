import { z } from "zod";
import { FzbBasicPostDataSchema } from "./fzb-basic-post";


export const FzbTcgTradeEventPostDataSchema = FzbBasicPostDataSchema.extend({
  postType: z.literal("tcg-trade-event"),
  traderName: z.string(),
  gameName: z.string(),
  cardName: z.string(),
  cardImageUrl: z.string(),
});

export type FzbTcgTradeEventPostData = z.infer<typeof FzbTcgTradeEventPostDataSchema>;
