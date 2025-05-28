import { BoardComponentWrapper } from "@/src/components/play-board/board-component-wrapper";
import { BOARD_TYPE_GRID_SCREEN } from "@/src/zod-types/boards/board-types/fzb-board-grid-screen";
import { BOARD_TYPE_PROMO } from "@/src/zod-types/boards/board-types/fzb-board-promo";
import { BOARD_TYPE_SINGLE_SCREEN } from "@/src/zod-types/boards/board-types/fzb-board-single-screen";
import { GRID_DIMENSION_OPTIONS } from "@/src/zod-types/boards/grid-dimensions";
import { BoardId } from "@/src/zod-types/branded-strings/board-id";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";


interface LaunchedOrgBoardScreenProps {
  boardId: BoardId
  boardName: string;
  boardConfigJson: any;
}

export const LaunchedOrgBoardScreen = ({ boardId, boardName, boardConfigJson }: LaunchedOrgBoardScreenProps) => {
  // const localSearchParams = useLocalSearchParams();
  // const { boardId, boardUuid } = convertIdSearchParamToBoardIds(localSearchParams);
  // const { isFullscreen, launchFullscreenPlay } = useFullscreenPlay();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // const [boardConfig, setBoardConfig] = useState<BoardSetupDbRowFull | null>(null);
  // const { supabase } = useUserContext();
  
  
  // useEffect(() => {
  //   const fetchBoardConfig = async () => {
  //     console.log("fetchBoardConfig", boardUuid);
  //     const fetchedBoardConfig = await fetchBoardConfigurationById(supabase, boardUuid);
  //     console.log("fetchedBoardConfig", fetchedBoardConfig);
      
  //     const parsedBoardConfig = BoardSetupDbRowFullSchema.safeParse(fetchedBoardConfig);
  //     if (!parsedBoardConfig.success) {
  //       console.error(parsedBoardConfig.error);
  //       return;
  //     }
      
  //     setBoardConfig(parsedBoardConfig.data);
  //   };

  //   fetchBoardConfig();
  // }, [boardUuid, supabase]);

  // Add fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // if (!boardConfig) {
  //   return <Text>Loading...</Text>;
  // }

  const onRequestFullscreen = () => {
    document.documentElement.requestFullscreen();
    setIsFullscreen(true);
  }

  const onBackToBoardsPage = () => {
    router.push('/(tabs)/org/boards');
  }

  const onBackToBoardSetupPage = () => {
    const boardPath = `/(tabs)/org/boards/${boardId}`;
    router.navigate(boardPath);
    // router.push({
    //   pathname: `/(tabs)/org/boards/${boardId}`,
    //   // params: {
    //   //   id: boardId,
    //   // },
    // });
  }


  const config = boardConfigJson;
  const boardType = config.boardType;

  const getBoardValues = () => {
    switch (boardType) {
      case BOARD_TYPE_PROMO:
        return { rowCount: 1, columnCount: 1, allScreenSettings: [config.screenConfig] };

      case BOARD_TYPE_SINGLE_SCREEN:
        return { rowCount: 1, columnCount: 1, allScreenSettings: [config.screenConfig] };

      case BOARD_TYPE_GRID_SCREEN:
        const gridDimensions = GRID_DIMENSION_OPTIONS.find(option => option.id === config.gridDimensionsId);
        if (!gridDimensions) {
          throw new Error(`Unknown grid dimensions: ${config.gridDimensionsId}`);
        }

        return { rowCount: gridDimensions.rowCount, columnCount: gridDimensions.columnCount, allScreenSettings: config.allScreenSettings };
      default:
        throw new Error(`Unknown board type: ${boardType}`);
    }
  }

  const { rowCount, columnCount, allScreenSettings } = getBoardValues();

  return (
    <>
      {boardConfigJson && (
        <BoardComponentWrapper
          boardId={boardId}
          rowCount={rowCount}
          columnCount={columnCount}
          allScreenSettings={allScreenSettings}
          isFullscreen={isFullscreen}
          onRequestFullscreen={onRequestFullscreen}
          onBackToBoardSetupPage={onBackToBoardSetupPage}
          onBackToBoardsPage={onBackToBoardsPage}
        />
      )}
    </>
  );
} 

export default LaunchedOrgBoardScreen;
