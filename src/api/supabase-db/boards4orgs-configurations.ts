import { OrgBoardSetupDbRow, OrgBoardSetupDbRowNew, OrgBoardSetupDbRowSave } from "@/src/zod-types/boards/org-board-setup-db-row";
import { SupabaseClient } from "@supabase/supabase-js";


export const fetchOrgBoardConfigurations = async (supabase: SupabaseClient, orgId: string) => {
  const { data, error } = await supabase
    .from('boards4orgs')
    .select('*')
    .eq('clerk_org_id', orgId)
    .order('created_at', { ascending: false });

  console.log('fetchOrgBoardConfigurations', data);

  if (error) {
    throw error;
  }

  return data;
};


export const fetchOrgBoardConfigurationById = async (supabase: SupabaseClient, boardUuid: string) => {

  const { data, error } = await supabase
    .from('boards4orgs')
    .select('*')
    .eq('id', boardUuid)
    .single();

  if (error) {
    throw error;
  }

  console.log('fetchOrgBoardConfigurationById complete', data);

  return data;
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
    .from('boards4orgs')
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
    .from('boards4orgs')
    .update(updateRecord)
    .eq('id', updateRecord.id);

  if (error) {
    throw error;
  }

  return data;
};
