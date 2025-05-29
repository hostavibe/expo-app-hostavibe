import { UnknownOutputParams } from "expo-router";
import { z } from "zod";
import { createBrandedString } from "./branded-strings";


export const UserBoardIdPrefix = 'ubrd_';
export const OrgBoardIdPrefix = 'obrd_';

export const BoardOwnerTypeSchema = z.enum(['user', 'org']);
export type BoardOwnerType = z.infer<typeof BoardOwnerTypeSchema>;

// User Board ID type (starts with 'ubrd_')
export const UserBoardIdSchema = createBrandedString(UserBoardIdPrefix);
export type UserBoardId = z.infer<typeof UserBoardIdSchema>;

// Org Board ID type (starts with 'obrd_')
export const OrgBoardIdSchema = createBrandedString(OrgBoardIdPrefix);
export type OrgBoardId = z.infer<typeof OrgBoardIdSchema>;

export const BoardIdSchema = z.union([UserBoardIdSchema, OrgBoardIdSchema]);
export type BoardId = z.infer<typeof BoardIdSchema>;


export type UserBoardIdentifiers = {
  boardOwnerType: 'user';
  boardUuid: string;
  boardId: UserBoardId;
}

export type OrgBoardIdentifiers = {
  boardOwnerType: 'org';
  boardUuid: string;
  boardId: OrgBoardId;
}

export type BoardIdentifiers = UserBoardIdentifiers | OrgBoardIdentifiers;

export const convertBoardIdStringToIdentifiers = (boardIdStr: string): BoardIdentifiers => {

  const parsedBoardId = BoardIdSchema.safeParse(boardIdStr);
  if (!parsedBoardId.success) {
    console.log('boardIdStr', boardIdStr);
    throw new Error(`Invalid board ID - ${boardIdStr}`);
  }

  if (parsedBoardId.data.startsWith(UserBoardIdPrefix)) {
    return {
      boardOwnerType: 'user',
      boardUuid: parsedBoardId.data.substring(UserBoardIdPrefix.length),
      boardId: boardIdStr as UserBoardId,
    };
  }

  if (parsedBoardId.data.startsWith(OrgBoardIdPrefix)) {
    return {
      boardOwnerType: 'org',
      boardUuid: parsedBoardId.data.substring(OrgBoardIdPrefix.length),
      boardId: boardIdStr as OrgBoardId,
    };
  }

  throw new Error(`Invalid board ID - ${boardIdStr}`);
}

export const convertIdSearchParamToBoardIdentifiers = (localSearchParams: UnknownOutputParams): BoardIdentifiers => {
  console.log('localSearchParams', localSearchParams);
  const boardId = localSearchParams.id as string;

  const retVal = convertBoardIdStringToIdentifiers(boardId);
  return retVal;
}
