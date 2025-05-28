import { fetchUserBoardConfigurationById, saveUserBoardConfiguration } from "@/src/api/supabase-db/boards4users-configurations";
import { useUserContext } from "@/src/hooks/user-context";
import { UserBoardSetupDbRowFull, UserBoardSetupDbRowFullSchema } from "@/src/zod-types/boards/user-board-setup-db-row";
import { BoardOwnerType } from "@/src/zod-types/branded-strings/board-id";
import { createContext, useContext, useEffect, useState } from "react";


export type UserBoardsScreenContextType = {
  lastSavedBoardSetup: UserBoardSetupDbRowFull | null;
  currentBoardSetup: UserBoardSetupDbRowFull | null;

  boardUuid: string | null;
  boardOwnerType: BoardOwnerType | null;

  isDirty: boolean;
  isLoading: boolean;
  error: string | null;

  // setBoardIdentity: (boardUuid: string, boardOwnerType: BoardOwnerType) => void;
  onSave: () => void;
  updateCurrentBoardSetup: (boardConfig: UserBoardSetupDbRowFull) => void;
};

export const UserBoardsScreenContext = createContext<UserBoardsScreenContextType>({
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

export const useUserBoardsScreenContext = () => useContext(UserBoardsScreenContext);


interface UserBoardsScreenContextProviderProps {
  children: React.ReactNode;
  boardUuid: string;
  boardOwnerType: BoardOwnerType;
}

export const UserBoardsScreenContextProvider = ({ children, boardUuid, boardOwnerType }: UserBoardsScreenContextProviderProps) => {
  const { supabase } = useUserContext();

  // const [boardUuid, setBoardUuid] = useState<string | null>(null);
  // const [boardOwnerType, setBoardOwnerType] = useState<BoardOwnerType | null>(null);
  const [lastSavedBoardSetup, setLastSavedBoardSetup] = useState<UserBoardSetupDbRowFull | null>(null);
  const [currentBoardSetup, setCurrentBoardSetup] = useState<UserBoardSetupDbRowFull | null>(null);

  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDirty = currentBoardSetup !== null &&
    lastSavedBoardSetup !== null && 
    JSON.stringify(currentBoardSetup) !== JSON.stringify(lastSavedBoardSetup);


  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setError(null);
        setIsLoading(true);

        console.log('fetching board', boardUuid, boardOwnerType);
        const data = await fetchUserBoardConfigurationById(supabase, boardUuid);
        console.log('board data', data);

        const boardDataCheck = UserBoardSetupDbRowFullSchema.safeParse(data);
        if (!boardDataCheck.success) {
          console.log('data', data);
          console.error('Invalid board configuration', boardDataCheck.error);
          return;
        }

        const boardData = boardDataCheck.data;
        setCurrentBoardSetup(boardData);
        setLastSavedBoardSetup(boardData);

      } catch (err) {
        console.error('Error fetching board:', err);
        setError('Failed to load board configuration');
      } finally {
        setIsLoading(false);
      }
    }

    fetchBoard();
  }, [supabase, boardUuid, setCurrentBoardSetup, boardOwnerType]);
    

  const saveUpdatedBoardConfig = async () => {

    if (!currentBoardSetup) {
      console.error('No current board setup to save');
      return;
    }

    console.log('saving board', currentBoardSetup);

    try {
      setIsLoading(true);
      await saveUserBoardConfiguration(supabase, currentBoardSetup);

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

  return (
    <UserBoardsScreenContext.Provider value={{
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
    </UserBoardsScreenContext.Provider>
  );
};
