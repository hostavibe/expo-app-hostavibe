import { fetchBoardConfigurationById, saveBoardConfiguration } from "@/src/api/supabase-db/board-configurations";
import { useUserContext } from "@/src/hooks/user-context";
import { BoardSetupDbRowFull, BoardSetupDbRowFullSchema } from "@/src/zod-types/boards/board-setup-db-row";
import { createContext, useContext, useEffect, useState } from "react";


type SaveBoardSetupContextType = {
  lastSavedBoardSetup: BoardSetupDbRowFull | null;
  currentBoardSetup: BoardSetupDbRowFull | null;

  boardUuid: string | null;

  isDirty: boolean;
  isLoading: boolean;
  error: string | null;

  setBoardUuid: (boardUuid: string) => void;
  onSave: () => void;
  updateCurrentBoardSetup: (boardConfig: BoardSetupDbRowFull) => void;
};

const SaveBoardSetupContext = createContext<SaveBoardSetupContextType>({
  boardUuid: null,
  lastSavedBoardSetup: null,
  currentBoardSetup: null,

  isDirty: false,
  isLoading: false,
  error: null,

  setBoardUuid: () => {
    throw new Error('setBoardUuid not implemented - are you using the SaveBoardSetupContextProvider?');
  },
  onSave: () => {
    throw new Error('onSave not implemented - are you using the SaveBoardSetupContextProvider?');
  },
  updateCurrentBoardSetup: () => {
    throw new Error('updateCurrentBoardSetup not implemented - are you using the SaveBoardSetupContextProvider?');
  },
});

export const useSaveBoardSetupContext = () => useContext(SaveBoardSetupContext);


export const SaveBoardSetupContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { supabase } = useUserContext();

  // const [isDirty, setIsDirty] = useState(false);
  const [boardUuid, setBoardUuid] = useState<string | null>(null);
  const [lastSavedBoardSetup, setLastSavedBoardSetup] = useState<BoardSetupDbRowFull | null>(null);
  const [currentBoardSetup, setCurrentBoardSetup] = useState<BoardSetupDbRowFull | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDirty = currentBoardSetup !== null &&
    lastSavedBoardSetup !== null && 
    JSON.stringify(currentBoardSetup) !== JSON.stringify(lastSavedBoardSetup);


  useEffect(() => {
    const fetchBoard = async () => {
      try {
        if (!boardUuid) {
          return;
        }

        setError(null);
        setIsLoading(true);

        console.log('fetching board', boardUuid);
        const data = await fetchBoardConfigurationById(supabase, boardUuid);
        console.log('board data', data);

        const boardDataCheck = BoardSetupDbRowFullSchema.safeParse(data);
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
  }, [ supabase, boardUuid, setCurrentBoardSetup]);
    

  const saveUpdatedBoardConfig = async () => {

    if (!currentBoardSetup) {
      console.error('No current board setup to save');
      return;
    }

    console.log('saving board', currentBoardSetup);

    // const boardUuid = currentBoardSetup.id;

    try {
      setIsLoading(true);
      await saveBoardConfiguration(supabase, currentBoardSetup);

      // const parsedBoardConfig = BoardSetupDbRowFullSchema.safeParse(savedBoardConfig);
      // if (parsedBoardConfig.success) {
        // setCurrentBoardSetup(parsedBoardConfig.data);
        setLastSavedBoardSetup(currentBoardSetup);
        
      // } else {
      //   console.error('Error parsing board config:', parsedBoardConfig.error);
      // }

    } catch (err) {
      console.error('Error updating board config:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SaveBoardSetupContext.Provider value={{
      currentBoardSetup,
      lastSavedBoardSetup,

      isDirty,
      isLoading,
      error,

      boardUuid,
      setBoardUuid,

      onSave: saveUpdatedBoardConfig,
      updateCurrentBoardSetup: setCurrentBoardSetup,
    }}>
      {children}
    </SaveBoardSetupContext.Provider>
  );
};
