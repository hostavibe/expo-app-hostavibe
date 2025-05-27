import { z } from "zod";


export const UserBoardSetupDbRowSchema = z.object({
  name: z.string(),
  description: z.string(),
  configuration_json: z.any(),
  clerk_user_id: z.string(),
});

export type UserBoardSetupDbRow = z.infer<typeof UserBoardSetupDbRowSchema>;


export const UserBoardSetupDbRowNewSchema = UserBoardSetupDbRowSchema.extend({
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserBoardSetupDbRowNew = z.infer<typeof UserBoardSetupDbRowNewSchema>;


export const UserBoardSetupDbRowFullSchema = UserBoardSetupDbRowNewSchema.extend({
  id: z.string(),
});

export type UserBoardSetupDbRowFull = z.infer<typeof UserBoardSetupDbRowFullSchema>;


export const BoardSetupDbRowSaveSchema = UserBoardSetupDbRowFullSchema.extend({
  id: z.string(),
});

export type UserBoardSetupDbRowSave = z.infer<typeof BoardSetupDbRowSaveSchema>;
