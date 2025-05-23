import { z } from "zod";


export const BoardSetupDbRowNewSchema = z.object({
  name: z.string(),
  description: z.string(),
  configuration_json: z.any(),
  clerk_user_id: z.string(),
  clerk_org_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type BoardSetupDbRowNew = z.infer<typeof BoardSetupDbRowNewSchema>;


export const BoardSetupDbRowFullSchema = BoardSetupDbRowNewSchema.extend({
  id: z.string(),
});

export type BoardSetupDbRowFull = z.infer<typeof BoardSetupDbRowFullSchema>;


export const BoardSetupDbRowSaveSchema = BoardSetupDbRowFullSchema.extend({
  id: z.string(),
});

export type BoardSetupDbRowSave = z.infer<typeof BoardSetupDbRowSaveSchema>;
