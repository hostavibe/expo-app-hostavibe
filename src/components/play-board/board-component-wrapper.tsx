import { createScreenIdForRowAndColumn } from "@/app/utils";
import { BoardId } from "@/src/zod-types/branded-strings/board-id";
import { FzbScreenId } from "@/src/zod-types/branded-strings/fb-branded-strings";
import { FzbPostData } from "@/src/zod-types/posts/fzb-post";
import { FzbScreenConfigData } from "@/src/zod-types/screen-config/fzb-screen-config";
import { ScreenPost } from "@/src/zod-types/screen-post";
import _ from "lodash";
import { BoardComponent } from "./board-component";


interface BoardComponentWrapperProps {
  boardId: BoardId;
  rowCount: number;
  columnCount: number;

  allScreenSettings: FzbScreenConfigData[],

  isFullscreen: boolean;
  onRequestFullscreen: () => void;
  onBackToBoardSetupPage: () => void;
  onBackToBoardsPage: () => void;
}

export const BoardComponentWrapper = ({ 
  boardId,
  rowCount, 
  columnCount,
  allScreenSettings,
  isFullscreen,
  onRequestFullscreen,
  onBackToBoardSetupPage,
  onBackToBoardsPage,
}: BoardComponentWrapperProps) => {

  const gridPostsData = new Map<FzbScreenId, FzbPostData>();

  const screenIds = _
    .range(rowCount)
    .flatMap(rowIndex => 
      _.range(columnCount)
        .map(colIndex => createScreenIdForRowAndColumn(boardId, rowIndex, colIndex))
    );

  const screenPosts: ScreenPost[] = screenIds.map(screenId => {
    const retVal: ScreenPost = {
      screenId,
      postData: gridPostsData.get(screenId) ?? null,
    }
    return retVal;
  });


  return (
    <BoardComponent
      rowCount={rowCount}
      columnCount={columnCount}
      allScreenSettings={allScreenSettings}
      isFullscreen={isFullscreen}
      onRequestFullscreen={onRequestFullscreen}
      onBackToBoardSetupPage={onBackToBoardSetupPage}
      onBackToBoardsPage={onBackToBoardsPage}
      screenPosts={screenPosts}
    />
  )
}
