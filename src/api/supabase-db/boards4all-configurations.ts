import { BoardOwnerType } from "@/src/zod-types/branded-strings/board-id";
import { SupabaseClient } from "@supabase/supabase-js";
import { fetchOrgBoardConfigurationById } from "./boards4orgs-configurations";
import { fetchUserBoardConfigurationById } from "./boards4users-configurations";


// export type BoardOwnerType = 'user' | 'org';


export const fetchAnyBoardConfigurationById = async (supabase: SupabaseClient, boardUuid: string, boardOwnerType: BoardOwnerType) => {

  if (boardOwnerType === 'org') {
    return await fetchOrgBoardConfigurationById(supabase, boardUuid);
  }

  if (boardOwnerType === 'user') {
    return await fetchUserBoardConfigurationById(supabase, boardUuid);
  }

  throw new Error(`Invalid board owner type: ${boardOwnerType}`);
};
