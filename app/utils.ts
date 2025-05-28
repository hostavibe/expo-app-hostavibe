import { BoardId } from "@/src/zod-types/branded-strings/board-id";
import { FzbBoardId, FzbScreenGridName, FzbScreenId, FzbScreenSlotId, FzbScreenSlotIdSchema } from "@/src/zod-types/branded-strings/fb-branded-strings";
// import { FzbBoardId, FzbScreenGridName, FzbScreenId, FzbScreenSlotId, FzbScreenSlotIdSchema } from "@/src/zod-types/branded-strings/fzb-branded-strings";

// Use Vite's import.meta.env to get the base URL
// export const SERVER_HOST = window.location.hostname === 'localhost' 
//   ? 'http://localhost:8081'
//   : window.location.origin;

// export const SERVER_URL = SERVER_HOST + (import.meta.env.BASE_URL || '');
// const env = Constants.expoConfig?.extra?.ENV;
const env = process.env;
export const SERVER_HOST = env.SERVER_HOST;
export const SERVER_URL = SERVER_HOST + (env.BASE_URL || '');


export const getColumnLetter = (index: number) => {
  return String.fromCharCode(65 + index); // 65 is ASCII for 'A'
};


export const getGridCoordinate = (rowIndex: number, colIndex: number): FzbScreenGridName => {
  return `${getColumnLetter(colIndex)}${rowIndex + 1}` as FzbScreenGridName;
};


export const getGridCellName = (index: number, columnCount: number): FzbScreenGridName => {
  const rowIndex = Math.floor(index / columnCount);
  const colIndex = index % columnCount;
  const columnLetter = getColumnLetter(colIndex);
  return `${columnLetter}${rowIndex + 1}` as FzbScreenGridName;
};


// export const createFizzBoardId = (): FzbBoardId => {
//   const tbUniqueId = getUniqueId();
//   return tbUniqueId as FzbBoardId;
// };


// export const createNewPostId = (): FzbPostId => {
//   const tbUniqueId = getUniqueId();
//   return tbUniqueId as FzbPostId;
// };


export const createScreenIdForRowAndColumn = (boardId: BoardId, rowIndex: number, colIndex: number): FzbScreenId => {
  return `${boardId}:${getColumnLetter(colIndex)}${rowIndex + 1}` as FzbScreenId;
};

export const createScreenId = (boardId: FzbBoardId, gridCoordinate: FzbScreenSlotId): FzbScreenId => {
  return `${boardId}:${gridCoordinate}` as FzbScreenId;
};

export const createScreenUrl = (screenId: FzbScreenId) => {
  return `${SERVER_URL}/screens/${screenId}`;
};

export const getBoardIdFromScreenId = (screenId: FzbScreenId): FzbBoardId => {
  return screenId.split(':')[0] as FzbBoardId;
};

export const getScreenSlotIdFromScreenId = (screenSlotId: FzbScreenId): FzbScreenSlotId => {
  const screenSlotIdStr = screenSlotId.split(':')[1];
  const parsedScreenSlotId = FzbScreenSlotIdSchema.parse(screenSlotIdStr);
  return parsedScreenSlotId;
};

/**
 * Joins multiple path segments into a single URL path, ensuring there's only a single slash between segments
 * @param paths Array of path segments to join
 * @returns Properly joined path string
 */
export const joinPaths = (...paths: string[]): string => {
  return paths
    .map(path => path.replace(/^\/+|\/+$/g, '')) // Remove leading and trailing slashes
    .filter(Boolean) // Remove empty strings
    .join('/');
};
