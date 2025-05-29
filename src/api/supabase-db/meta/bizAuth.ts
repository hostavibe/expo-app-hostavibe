import { BoardIdentifiers } from "@/src/zod-types/branded-strings/board-id";
import { SupabaseClient } from "@supabase/supabase-js";
import { fetchAnyBoardConfigurationByIdentifiers } from "../boards4all-configurations";


export const canIPostToBoardWithoutRequiringApproval = async (
  supabase: SupabaseClient, 
  boardId?: BoardIdentifiers
): Promise<boolean> => {

  if (!boardId) {
    return false;
  }

  const boardConfig = await fetchAnyBoardConfigurationByIdentifiers(supabase, boardId);

  if (boardConfig === null) {
    return false;
  }

  return true;
}
