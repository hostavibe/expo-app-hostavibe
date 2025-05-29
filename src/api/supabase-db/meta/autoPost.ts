import { BoardIdentifiers, OrgBoardIdentifiers, UserBoardIdentifiers } from "@/src/zod-types/branded-strings/board-id";
import { SupabaseClient } from "@supabase/supabase-js";
import { addUserBoardPostSubmission, UserBoardPostSubmissionAdd } from "../user-board-post-submissions";


const autoPostToUserBoard = async (supabase: SupabaseClient, boardId: UserBoardIdentifiers, postId: string) => {

  const userPostSubmission: UserBoardPostSubmissionAdd = {
    submitted_user_post_id: postId,
    submitted_board4user_id: boardId.boardId,
  }

  const result = await addUserBoardPostSubmission(supabase, userPostSubmission);
  console.info('autoPostToUserBoard result', result);

  console.info('autoPostToUserBoard', boardId, postId);
}


const autoPostToOrgBoard = async (supabase: SupabaseClient, boardId: OrgBoardIdentifiers, postId: string) => {
  console.info('autoPostToOrgBoard', boardId, postId);
}


export const autoPostToBoard = async (supabase: SupabaseClient, boardId: BoardIdentifiers, postId: string) => {
  console.info('autoPostToBoard', boardId, postId);

  if (boardId.boardOwnerType === 'user') {
    await autoPostToUserBoard(supabase, boardId, postId);
  } else {
    await autoPostToOrgBoard(supabase, boardId, postId);
  }
}
