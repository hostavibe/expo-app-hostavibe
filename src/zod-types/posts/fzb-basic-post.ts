import { z } from "zod";


// export const FzbPostDataTypeBrandKey = 'FzbPostDataType';

export const POST_TYPE_IMAGE_LINK = "image-link" as const;
export const POST_TYPE_IFRAME_LINK = "iframe-link" as const;
export const POST_TYPE_PDF_LINK = "pdf-link" as const;
export const POST_TYPE_TEXT_CONTENT = "text-content" as const;
export const POST_TYPE_URL_QRCODE_WITH_CAPTION = "url-qrcode-with-caption" as const;


export const FzbPostTypes = [
  POST_TYPE_TEXT_CONTENT,
  POST_TYPE_IMAGE_LINK,
  POST_TYPE_IFRAME_LINK,
  POST_TYPE_URL_QRCODE_WITH_CAPTION,
  POST_TYPE_PDF_LINK,
] as const;

// Create a type union from the array
export type FzbPostType = typeof FzbPostTypes[number];

// Create a Zod enum from the array
export const FzbPostTypeEnumSchema = z.enum(FzbPostTypes);

export const FzbBasicPostDataSchema = z.object({
  postType: FzbPostTypeEnumSchema,
  name: z.string(),
});

export type FzbBasicPostData = z.infer<typeof FzbBasicPostDataSchema>;
