import { z } from "zod";


export const FzbBoardIdSchema = z.string().brand('FzbBoardId');
export type FzbBoardId = z.infer<typeof FzbBoardIdSchema>;


export const FzbPostIdSchema = z.string().brand('FzbPostId');
export type FzbPostId = z.infer<typeof FzbPostIdSchema>;


export const FzbScreenConfigTypeSchema = z.string().brand('FzbScreenConfigType');
export type FzbScreenConfigType = z.infer<typeof FzbScreenConfigTypeSchema>;


export const FzbLetterNumberIdSchema = z.string()
  .regex(/^[A-Z]([0-9]|[1-9][0-9])$/, 'Must be a capital letter A-Z followed by a number 0-99')
  .brand('FzbLetterNumberId');
export type FzbLetterNumberId = z.infer<typeof FzbLetterNumberIdSchema>;


export const FzbScreenSlotIdSchema = FzbLetterNumberIdSchema.brand('FzbScreenSlotId');
export type FzbScreenSlotId = z.infer<typeof FzbScreenSlotIdSchema>;


export const FzbScreenGridNameSchema = z.string().brand('FzbScreenGridName');
export type FzbScreenGridName = z.infer<typeof FzbScreenGridNameSchema>;


export const FzbScreenIdSchema = z.string()
  .refine((val) => {
    const [boardId, screenSlotId] = val.split(':');
    return FzbBoardIdSchema.safeParse(boardId).success && 
           FzbScreenSlotIdSchema.safeParse(screenSlotId).success;
  }, 'Must be a valid board ID followed by a colon and a valid screen slot ID')
  .brand('FzbScreenId');
export type FzbScreenId = z.infer<typeof FzbScreenIdSchema>;
