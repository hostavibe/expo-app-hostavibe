import { BoardSetupDbRowSave } from "@/zod-types/board-setup/board-setup-db-row";
import { SupabaseClient } from "@supabase/supabase-js";


export const fetchBoardConfigurations = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from('board_configurations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};


export const fetchBoardConfigurationById = async (supabase: SupabaseClient, boardUuid: string) => {

  const { data, error } = await supabase
    .from('board_configurations')
    .select('*')
    .eq('id', boardUuid)
    .single();

  if (error) {
    throw error;
  }

  return data;
};


export const addBoardConfiguration = async (supabase: SupabaseClient, boardConfig: BoardSetupDbRowSave) => {
  const now = new Date();

  const insertRecord: BoardSetupDbRowSave = {
    ...boardConfig,
    created_at: now.toISOString(),
  }

  const { data, error } = await supabase
    .from('board_configurations')
    .insert(insertRecord);

  if (error) {
    throw error;
  }

  return data;
};


export const saveBoardConfiguration = async (supabase: SupabaseClient, boardConfig: BoardSetupDbRowSave) => {
  const now = new Date();

  const updateRecord: BoardSetupDbRowSave = {
    ...boardConfig,
    updated_at: now.toISOString(),
  }

  console.log('updateRecord', updateRecord);

  const { data, error } = await supabase
    .from('board_configurations')
    .update(updateRecord)
    .eq('id', updateRecord.id);

  if (error) {
    throw error;
  }

  return data;
};
