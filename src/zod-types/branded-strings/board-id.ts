import { UnknownOutputParams } from "expo-router";
import { z } from "zod";
import { createBrandedString } from "./branded-strings";


export const UserBoardIdPrefix = 'ubrd_';
export const OrgBoardIdPrefix = 'obrd_';

export const BoardOwnerTypeSchema = z.enum(['user', 'org']);
export type BoardOwnerType = z.infer<typeof BoardOwnerTypeSchema>;

// export type BoardOwnerType = (typeof BoardOwnerType)[keyof typeof BoardOwnerType];


// User Board ID type (starts with 'ubrd_')
export const UserBoardIdSchema = createBrandedString(UserBoardIdPrefix);
export type UserBoardId = z.infer<typeof UserBoardIdSchema>;

// Org Board ID type (starts with 'obrd_')
export const OrgBoardIdSchema = createBrandedString(OrgBoardIdPrefix);
export type OrgBoardId = z.infer<typeof OrgBoardIdSchema>;

export const BoardIdSchema = z.union([UserBoardIdSchema, OrgBoardIdSchema]);
export type BoardId = z.infer<typeof BoardIdSchema>;

type BoardIdentifiers = {
  boardOwnerType: 'user' | 'org';
  boardUuid: string;
  boardId: BoardId;
}

export const convertIdSearchParamToBoardIds = (localSearchParams: UnknownOutputParams): BoardIdentifiers => {
  console.log('localSearchParams', localSearchParams);
  const boardId = localSearchParams.id as string;

  const parsedBoardId = BoardIdSchema.safeParse(boardId);
  if (!parsedBoardId.success) {
    console.log('localSearchParams', localSearchParams);
    throw new Error(`Invalid board ID - ${boardId}`);
  }

  const boardUuid = parsedBoardId.data.substring(
    parsedBoardId.data.startsWith(UserBoardIdPrefix) 
      ? UserBoardIdPrefix.length 
      : OrgBoardIdPrefix.length
  );

  console.log('boardUuid', boardUuid);

  return {
    boardOwnerType: parsedBoardId.data.startsWith(UserBoardIdPrefix) ? 'user' : 'org',
    boardUuid,
    boardId: parsedBoardId.data,
  };
}