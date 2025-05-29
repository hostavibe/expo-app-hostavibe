import { UserBoardSetupDbRow, UserBoardSetupDbRowFull, UserBoardSetupDbRowFullSchema, UserBoardSetupDbRowNew, UserBoardSetupDbRowSave } from "@/src/zod-types/boards/user-board-setup-db-row";
import { SupabaseClient } from "@supabase/supabase-js";


const BOARDS4USERS_TABLE = 'boards4users';


export const fetchUserBoardConfigurations = async (supabase: SupabaseClient): Promise<UserBoardSetupDbRowFull[]> => {
  const { data, error } = await supabase
    .from(BOARDS4USERS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  const parsedData = UserBoardSetupDbRowFullSchema.array().parse(data);

  return parsedData;
};


export const fetchUserBoardConfigurationById = async (supabase: SupabaseClient, boardUuid: string): Promise<UserBoardSetupDbRowFull | null> => {

  const { data, error } = await supabase
    .from(BOARDS4USERS_TABLE)
    .select('*')
    .eq('id', boardUuid)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  const parsedData = UserBoardSetupDbRowFullSchema.parse(data);

  return parsedData;
};


export const addUserBoardConfiguration = async (supabase: SupabaseClient, boardConfig: UserBoardSetupDbRow) => {
  const now = new Date();

  const newBoardConfig: UserBoardSetupDbRowNew = {
    ...boardConfig,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
  }

  const { data, error } = await supabase
    .from(BOARDS4USERS_TABLE)
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
    .from(BOARDS4USERS_TABLE)
    .update(updateRecord)
    .eq('id', updateRecord.id);

  if (error) {
    throw error;
  }

  return data;
};
