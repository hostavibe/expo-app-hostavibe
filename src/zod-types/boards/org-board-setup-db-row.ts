import { z } from "zod";


export const OrgBoardSetupDbRowSchema = z.object({
  name: z.string(),
  description: z.string(),
  configuration_json: z.any(),
  
  clerk_org_id: z.string(),
});

export type OrgBoardSetupDbRow = z.infer<typeof OrgBoardSetupDbRowSchema>;


export const OrgBoardSetupDbRowNewSchema = OrgBoardSetupDbRowSchema.extend({
  last_updated_by_user_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type OrgBoardSetupDbRowNew = z.infer<typeof OrgBoardSetupDbRowNewSchema>;


export const OrgBoardSetupDbRowFullSchema = OrgBoardSetupDbRowNewSchema.extend({
  id: z.string(),
});

export type OrgBoardSetupDbRowFull = z.infer<typeof OrgBoardSetupDbRowFullSchema>;


export const OrgBoardSetupDbRowSaveSchema = OrgBoardSetupDbRowFullSchema.extend({
  id: z.string(),
});

export type OrgBoardSetupDbRowSave = z.infer<typeof OrgBoardSetupDbRowSaveSchema>;
