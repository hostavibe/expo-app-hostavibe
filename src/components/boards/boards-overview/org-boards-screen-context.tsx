import { BoardOwnerType } from "@/src/api/supabase-db/boards4all-configurations";
import { fetchOrgBoardConfigurationById, saveOrgBoardConfiguration } from "@/src/api/supabase-db/boards4orgs-configurations";
import { useUserContext } from "@/src/hooks/user-context";
import { OrgBoardSetupDbRowFull, OrgBoardSetupDbRowFullSchema } from "@/src/zod-types/boards/org-board-setup-db-row";
import { createContext, useContext, useEffect, useState } from "react";


export type OrgBoardsScreenContextType = {
  lastSavedBoardSetup: OrgBoardSetupDbRowFull | null;
  currentBoardSetup: OrgBoardSetupDbRowFull | null;

  boardUuid: string | null;
  boardOwnerType: BoardOwnerType | null;

  isDirty: boolean;
  isLoading: boolean;
  error: string | null;

  // setBoardIdentity: (boardUuid: string, boardOwnerType: BoardOwnerType) => void;
  onSave: () => void;
  updateCurrentBoardSetup: (boardConfig: OrgBoardSetupDbRowFull) => void;
};

export const OrgBoardsScreenContext = createContext<OrgBoardsScreenContextType>({
  boardUuid: null,
  boardOwnerType: null,

  lastSavedBoardSetup: null,
  currentBoardSetup: null,

  isDirty: false,
  isLoading: false,
  error: null,

  // setBoardIdentity: () => {
  //   throw new Error('setBoardIdentity not implemented - are you using the SaveBoardSetupContextProvider?');
  // },
  onSave: () => {
    throw new Error('onSave not implemented - are you using the SaveBoardSetupContextProvider?');
  },
  updateCurrentBoardSetup: () => {
    throw new Error('updateCurrentBoardSetup not implemented - are you using the SaveBoardSetupContextProvider?');
  },
});

export const useOrgBoardsScreenContext = () => useContext(OrgBoardsScreenContext);


export const OrgBoardsScreenContextProvider = ({ children, boardUuid, boardOwnerType }: { children: React.ReactNode, boardUuid: string, boardOwnerType: BoardOwnerType }) => {
  const { supabase } = useUserContext();

  // const [boardUuid, setBoardUuid] = useState<string | null>(null);
  // const [boardOwnerType, setBoardOwnerType] = useState<BoardOwnerType | null>(null);
  const [lastSavedBoardSetup, setLastSavedBoardSetup] = useState<OrgBoardSetupDbRowFull | null>(null);
  const [currentBoardSetup, setCurrentBoardSetup] = useState<OrgBoardSetupDbRowFull | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDirty = currentBoardSetup !== null &&
    lastSavedBoardSetup !== null && 
    JSON.stringify(currentBoardSetup) !== JSON.stringify(lastSavedBoardSetup);


  useEffect(() => {
    const fetchBoard = async () => {
      try {
        if (!boardUuid || !boardOwnerType) {
          return;
        }

        setError(null);
        setIsLoading(true);

        console.log('fetching board', boardUuid, boardOwnerType);
        const data = await fetchOrgBoardConfigurationById(supabase, boardUuid);
        console.log('board data', data);

        const boardDataCheck = OrgBoardSetupDbRowFullSchema.safeParse(data);
        if (!boardDataCheck.success) {
          console.log('data', data);
          console.error('Invalid board configuration', boardDataCheck.error);
          return;
        }

        const boardData = boardDataCheck.data;
        setCurrentBoardSetup(boardData);
        setLastSavedBoardSetup(boardData);
        setIsLoading(false);

      } catch (err) {
        console.error('Error fetching board:', err);
        setError('Failed to load board configuration');
      } finally {
        setIsLoading(false);
      }
    }

    fetchBoard();
  }, [supabase, boardUuid, boardOwnerType]);
    

  const saveUpdatedBoardConfig = async () => {

    if (!currentBoardSetup) {
      console.error('No current board setup to save');
      return;
    }

    console.log('saving board', currentBoardSetup);

    try {
      setIsLoading(true);
      await saveOrgBoardConfiguration(supabase, currentBoardSetup);

      setLastSavedBoardSetup(currentBoardSetup);

    } catch (err) {
      console.error('Error updating board config:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // const setBoardIdentity = (boardUuid: string, boardOwnerType: BoardOwnerType) => {
  //   setBoardUuid(boardUuid);
  //   setBoardOwnerType(boardOwnerType);
  // }

  console.log("complete", currentBoardSetup, isLoading)

  return (
    <OrgBoardsScreenContext.Provider value={{
      currentBoardSetup,
      lastSavedBoardSetup,

      isDirty,
      isLoading,
      error,

      boardUuid,
      boardOwnerType,
      // setBoardIdentity,

      onSave: saveUpdatedBoardConfig,
      updateCurrentBoardSetup: setCurrentBoardSetup,
    }}>
      {children}
    </OrgBoardsScreenContext.Provider>
  );
};
