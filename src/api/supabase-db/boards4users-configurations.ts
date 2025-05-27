import { UserBoardSetupDbRow, UserBoardSetupDbRowNew, UserBoardSetupDbRowSave } from "@/src/zod-types/boards/user-board-setup-db-row";
import { SupabaseClient } from "@supabase/supabase-js";


export const fetchUserBoardConfigurations = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from('boards4users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};


export const fetchUserBoardConfigurationById = async (supabase: SupabaseClient, boardUuid: string) => {

  const { data, error } = await supabase
    .from('boards4users')
    .select('*')
    .eq('id', boardUuid)
    .single();

  if (error) {
    throw error;
  }

  return data;
};


export const addUserBoardConfiguration = async (supabase: SupabaseClient, boardConfig: UserBoardSetupDbRow) => {
  const now = new Date();

  const newBoardConfig: UserBoardSetupDbRowNew = {
    ...boardConfig,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  }

  const { data, error } = await supabase
    .from('boards4users')
    .insert(newBoardConfig);

  if (error) {
    throw error;
  }

  return data;
};


export const saveUserBoardConfiguration = async (supabase: SupabaseClient, boardConfig: UserBoardSetupDbRowSave) => {
  const now = new Date();

  const updateRecord: UserBoardSetupDbRowSave = {
    ...boardConfig,
    updated_at: now.toISOString(),
  }

  console.log('updateRecord', updateRecord);

  const { data, error } = await supabase
    .from('boards4users')
    .update(updateRecord)
    .eq('id', updateRecord.id);

  if (error) {
    throw error;
  }

  return data;
};
