import { BoardId } from "../zod-types/branded-strings/board-id";
import { UserPostId } from "../zod-types/branded-strings/branded-strings";


export interface PostToBoardParams {
  postId?: UserPostId;
  boardId?: BoardId;
}