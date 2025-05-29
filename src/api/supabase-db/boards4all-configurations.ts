import { OrgBoardSetupDbRow } from "@/src/zod-types/boards/org-board-setup-db-row";
import { UserBoardSetupDbRow } from "@/src/zod-types/boards/user-board-setup-db-row";
import { BoardIdentifiers, BoardOwnerType, convertBoardIdStringToIdentifiers } from "@/src/zod-types/branded-strings/board-id";
import { SupabaseClient } from "@supabase/supabase-js";
import { fetchOrgBoardConfigurationById } from "./boards4orgs-configurations";
import { fetchUserBoardConfigurationById } from "./boards4users-configurations";


export const fetchAnyBoardConfigurationByIdentifiers = async (supabase: SupabaseClient, boardIdentifiers: BoardIdentifiers): Promise<UserBoardSetupDbRow | OrgBoardSetupDbRow | null> => {
  if (boardIdentifiers.boardOwnerType === 'org') {
    const boardConfig = await fetchOrgBoardConfigurationById(supabase, boardIdentifiers.boardUuid);
    return boardConfig;
  }

  if (boardIdentifiers.boardOwnerType === 'user') {
    return await fetchUserBoardConfigurationById(supabase, boardIdentifiers.boardUuid);
  }

  throw new Error(`Invalid board owner type: ${boardIdentifiers.boardOwnerType}`);
}


export const fetchAnyBoardConfigurationByStringId = async (supabase: SupabaseClient, boardId: string) => {

  const boardIdentifiers = convertBoardIdStringToIdentifiers(boardId);

  const retVal = await fetchAnyBoardConfigurationByIdentifiers(supabase, boardIdentifiers);

  return retVal;
}


export const fetchAnyBoardConfigurationByUUid = async (supabase: SupabaseClient, boardUuid: string, boardOwnerType: BoardOwnerType) => {

  if (boardOwnerType === 'org') {
    return await fetchOrgBoardConfigurationById(supabase, boardUuid);
  }

  if (boardOwnerType === 'user') {
    return await fetchUserBoardConfigurationById(supabase, boardUuid);
  }

  throw new Error(`Invalid board owner type: ${boardOwnerType}`);
};
