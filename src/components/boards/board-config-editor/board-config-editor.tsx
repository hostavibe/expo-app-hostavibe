import { BOARD_TYPE_GRID_SCREEN } from "@/src/zod-types/boards/board-types/fzb-board-grid-screen";
import { BOARD_TYPE_PROMO } from "@/src/zod-types/boards/board-types/fzb-board-promo";
import { BOARD_TYPE_SINGLE_SCREEN } from "@/src/zod-types/boards/board-types/fzb-board-single-screen";
import { FzbBoardTypes } from "@/src/zod-types/boards/board-types/fzb-board-types";
import { Text } from "react-native";
import { GridScreenBoardConfigEditor } from "./editors/grid-screen-board-config-editor";
import { PromoBoardConfigEditor } from "./editors/promo-board-config-editor";
import { SingleScreenBoardConfigEditor } from "./editors/single-screen-board-config-editor";


interface BoardConfigEditorProps {
  boardConfig: FzbBoardTypes;
  styles: any;
  setActiveBoardConfig: (updatedBoardConfig: FzbBoardTypes) => Promise<void>;
}

export const BoardConfigEditor = ({ boardConfig, styles, setActiveBoardConfig }: BoardConfigEditorProps) => {

  switch (boardConfig.boardType) {
    case BOARD_TYPE_PROMO:
      return (
        <PromoBoardConfigEditor
          boardConfig={boardConfig}
        />
      );
    case BOARD_TYPE_SINGLE_SCREEN:
      return (
        <SingleScreenBoardConfigEditor
          boardConfig={boardConfig}
          setActiveBoardConfig={setActiveBoardConfig}
        />
      );
    case BOARD_TYPE_GRID_SCREEN:
      return (
        <GridScreenBoardConfigEditor
          boardConfig={boardConfig}
          styles={styles}
          setActiveBoardConfig={setActiveBoardConfig}
        />
      );
    default:
      return <Text>No editor for invalid board type</Text>;
  }
};
