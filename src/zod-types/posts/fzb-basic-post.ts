import { z } from "zod";
import { FzbPostIdSchema } from "../branded-strings/fb-branded-strings";


export const FzbPostDataTypeBrandKey = 'FzbPostDataType';


export const FzbPostDataTypeValues = [
  z.literal('text-content'),
  z.literal('image-link'),
  z.literal('iframe-link'),
  z.literal('url-qrcode-with-caption'),
] as const;

// export type FzbPostDataTypeValues = typeof FzbPostDataTypeValues[number];


export const FzbPostDataTypeUnion = z.union(FzbPostDataTypeValues);

export type FzbPostDataType = z.infer<typeof FzbPostDataTypeUnion>;


export const FzbBasicPostDataSchema = z.object({
  id: FzbPostIdSchema,
  name: z.string(),
});

export type FzbBasicPostData = z.infer<typeof FzbBasicPostDataSchema>;
