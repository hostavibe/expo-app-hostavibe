import { fetchOrgBoardConfigurationById } from "@/src/api/supabase-db/boards4orgs-configurations";
import { fetchUserBoardConfigurationById } from "@/src/api/supabase-db/boards4users-configurations";
import { LaunchedOrgBoardScreen } from "@/src/components/play-board/launched-board-screen";
import { ThemedText } from "@/src/components/ThemedText";
import { useUserContext } from "@/src/hooks/user-context";
import { OrgBoardSetupDbRowFullSchema } from "@/src/zod-types/boards/org-board-setup-db-row";
import { UserBoardSetupDbRowFullSchema } from "@/src/zod-types/boards/user-board-setup-db-row";
import { convertIdSearchParamToBoardIds } from "@/src/zod-types/branded-strings/board-id";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";


export const PlayBoardScreen = () => {
  const localSearchParams = useLocalSearchParams();
  
  const boardIdentifiers = convertIdSearchParamToBoardIds(localSearchParams);
  const { boardOwnerType, boardUuid, boardId } = boardIdentifiers;

  const { supabase } = useUserContext();

  // const [orgBoardConfig, setOrgBoardConfig] = useState<OrgBoardSetupDbRowFull | null>(null);
  const [boardName, setBoardName] = useState<string | null>(null);
  const [boardConfigJson, setBoardConfigJson] = useState<any | null>(null);

  useEffect(() => {
    const fetchBoardConfig = async () => {
      try {
        if (boardOwnerType === 'org') {
          const data = await fetchOrgBoardConfigurationById(supabase, boardUuid);
          const boardDataCheck = OrgBoardSetupDbRowFullSchema.safeParse(data);
          if (!boardDataCheck.success) {
            console.log('data', data);
            console.error('Invalid org board configuration', boardDataCheck.error);
            return;
          }

          setBoardName(boardDataCheck.data.name);
          setBoardConfigJson(boardDataCheck.data.configuration_json);

        } else {
          const data = await fetchUserBoardConfigurationById(supabase, boardUuid);
          const boardDataCheck = UserBoardSetupDbRowFullSchema.safeParse(data);
          if (!boardDataCheck.success) {
            console.log('data', data);
            console.error('Invalid user board configuration', boardDataCheck.error);
            return;
          }

          setBoardName(boardDataCheck.data.name);
          setBoardConfigJson(boardDataCheck.data.configuration_json);
        }

      } catch (error) {
        console.error('Error fetching board configuration:', error);
      }
    }

    fetchBoardConfig();
  }, [supabase, boardUuid, boardOwnerType]);


  if (!boardConfigJson || !boardName) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
    <LaunchedOrgBoardScreen
      boardId={boardId}
      boardName={boardName}
      boardConfigJson={boardConfigJson}
    />
  )
}

export default PlayBoardScreen;
