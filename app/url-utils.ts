import { SERVER_URL, joinPaths } from "@/app/utils";
import { FzbBoardId, FzbScreenId } from "@/src/zod-types/branded-strings/fb-branded-strings";



export const BOARD_URL_PARAMS_ROW_COUNT = "rows";
export const BOARD_URL_PARAMS_COLUMN_COUNT = "columns";
export const BOARD_URL_PARAMS_BOARD_LOCATION_SETTING_ID = "settingId";

export const POST_TO_SCREEN_URL_PARAMS_DEMO_USER_PROFILE_ID = "demoUserId";


export const createShowBoardUrl = (
  boardId: FzbBoardId,
  _rowCount: number,
  _columnCount: number,
) => {

  const boardUrl = joinPaths(SERVER_URL, "/boards/", boardId);
  return boardUrl;
}

export const createSendPostToScreenUrl = (screenId: FzbScreenId) => {
  const sendPostToScreenPath = joinPaths(SERVER_URL, "/post-to-screen/", screenId);
  
  return sendPostToScreenPath;

  // const sendPostToScreenUrl = boardLocationSettingId ? 
  //   sendPostToScreenPath + "?" + BOARD_URL_PARAMS_BOARD_LOCATION_SETTING_ID + "=" + boardLocationSettingId :
  //   sendPostToScreenPath;

  // return sendPostToScreenUrl;
}

export const addUrlParam = (url: string, paramName: string, paramValue: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${paramName}=${paramValue}`;
};
