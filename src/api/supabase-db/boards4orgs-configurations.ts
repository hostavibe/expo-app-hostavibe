import { OrgBoardSetupDbRow, OrgBoardSetupDbRowFull, OrgBoardSetupDbRowFullSchema, OrgBoardSetupDbRowNew, OrgBoardSetupDbRowSave } from "@/src/zod-types/boards/org-board-setup-db-row";
import { SupabaseClient } from "@supabase/supabase-js";


const BOARDS4ORGS_TABLE = 'boards4orgs';


export const fetchOrgBoardConfigurations = async (supabase: SupabaseClient, orgId: string): Promise<OrgBoardSetupDbRowFull[]> => {
  const { data, error } = await supabase
    .from(BOARDS4ORGS_TABLE)
    .select('*')
    .eq('clerk_org_id', orgId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  const parsedData = OrgBoardSetupDbRowFullSchema.array().parse(data);

  return parsedData;
};


export const fetchOrgBoardConfigurationById = async (supabase: SupabaseClient, boardUuid: string): Promise<OrgBoardSetupDbRowFull | null> => {

  const { data, error } = await supabase
    .from(BOARDS4ORGS_TABLE)
    .select('*')
    .eq('id', boardUuid)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const parsedData = OrgBoardSetupDbRowFullSchema.parse(data);

  return parsedData;
};


export const addOrgBoardConfiguration = async (supabase: SupabaseClient, user_id: string, boardConfig: OrgBoardSetupDbRow) => {
  const now = new Date();

  const newBoardConfig: OrgBoardSetupDbRowNew = {
    ...boardConfig,
    last_updated_by_user_id: user_id,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  }

  console.log('insert newBoardConfig', newBoardConfig);

  const { data, error } = await supabase
    .from(BOARDS4ORGS_TABLE)
    .insert(newBoardConfig);

  if (error) {
    throw error;
  }

  return data;
};


export const saveOrgBoardConfiguration = async (supabase: SupabaseClient, boardConfig: OrgBoardSetupDbRowSave) => {
  const now = new Date();

  const updateRecord: OrgBoardSetupDbRowSave = {
    ...boardConfig,
    updated_at: now.toISOString(),
  }

  console.log('updateRecord', updateRecord);

  const { data, error } = await supabase
    .from(BOARDS4ORGS_TABLE)
    .update(updateRecord)
    .eq('id', updateRecord.id);

  if (error) {
    throw error;
  }

  return data;
};
