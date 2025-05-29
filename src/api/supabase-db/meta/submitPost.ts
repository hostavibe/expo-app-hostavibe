import { BoardIdentifiers, OrgBoardIdentifiers, UserBoardIdentifiers } from "@/src/zod-types/branded-strings/board-id";
import { SupabaseClient } from "@supabase/supabase-js";


const submitPostForReviewToUserBoard = async (supabase: SupabaseClient, boardId: UserBoardIdentifiers, postId: string) => {
  console.info('submitPostForReviewToUserBoard', boardId, postId);

  const { data, error } = await supabase
    .from('posts')
    .insert({ id: postId })
    .select();

  if (error) {
    console.error('submitPostForReviewToUserBoard: error', error);
  }
}


const submitPostForReviewToOrgBoard = async (supabase: SupabaseClient, boardId: OrgBoardIdentifiers, postId: string) => {
  console.info('submitPostForReviewToOrgBoard', boardId, postId);
}


export const submitPostForReview = async (supabase: SupabaseClient, boardId: BoardIdentifiers, postId: string) => {
  console.info('submitPostForReview', boardId, postId);

  if (boardId.boardOwnerType === 'user') {
    await submitPostForReviewToUserBoard(supabase, boardId, postId);
  } else {
    await submitPostForReviewToOrgBoard(supabase, boardId, postId);
  }
}
