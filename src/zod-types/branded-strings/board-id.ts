import { UnknownOutputParams } from "expo-router";
import { z } from "zod";
import { createBrandedString } from "./branded-strings";


export const BoardIdPrefix = 'board_';


// Board ID type (starts with 'board_')
export const BoardIdSchema = createBrandedString(BoardIdPrefix);
export type BoardId = z.infer<typeof BoardIdSchema>;


type BoardIds = {
  boardUuid: string;
  boardId: BoardId;
}

export const convertIdSearchParamToBoardIds = (localSearchParams: UnknownOutputParams): BoardIds => {
  const boardId = localSearchParams.id as string;

  const parsedBoardId = BoardIdSchema.safeParse(boardId);
  if (!parsedBoardId.success) {
    console.log('localSearchParams', localSearchParams);
    throw new Error('Invalid board ID');
  }

  const boardUuid = parsedBoardId.data.substring(BoardIdPrefix.length);

  return {
    boardUuid,
    boardId: parsedBoardId.data,
  };
}