import { NewPostSubmissionToUserBoard } from "@/src/api/types/submission-to-user-board";
import { BoardIdentifiers, OrgBoardIdentifiers, UserBoardIdentifiers } from "@/src/zod-types/branded-strings/board-id";
import { SupabaseClient } from "@supabase/supabase-js";
import { USER_BOARD_POST_SUBMISSIONS_TABLE } from "../table-names";
import { fetchMyUserPostById } from "../user-posts";


const submitPostForReviewToUserBoard = async (
  supabase: SupabaseClient,
  boardId: UserBoardIdentifiers,
  postId: string,
  userId: string,
  timeToExpirationInSeconds: number,
) => {
  console.info('submitPostForReviewToUserBoard', boardId, postId);

  const now = new Date();
  const submissionExpiresAt = new Date(now.getTime() + timeToExpirationInSeconds * 1000);

  const myPostData = await fetchMyUserPostById(supabase, postId);

  if (!myPostData) {
    throw new Error('Post data not found for postId: ' + postId);
  }

  if (!myPostData.content_json) {
    throw new Error('Post data content_json not found for postId: ' + postId);
  }

  const myPostDataContentJson = myPostData.content_json;

  const myPostDataContentUrlsJsonarray = myPostData.content_urls_jsonarray;

  const postSubmissionToUserBoard: NewPostSubmissionToUserBoard = {
    submitting_user_id: userId,
    submitted_user_post_id: postId,
    submitted_board4user_id: boardId.boardId,
    content_json: myPostDataContentJson,
    content_urls_jsonarray: [],
    submission_expires_at: submissionExpiresAt.toISOString(),
  }

  const { data, error } = await supabase
    .from(USER_BOARD_POST_SUBMISSIONS_TABLE)
    .insert(postSubmissionToUserBoard)
    .select();

  if (error) {
    console.error('submitPostForReviewToUserBoard: error', error);
  }
}


const submitPostForReviewToOrgBoard = async (supabase: SupabaseClient, boardId: OrgBoardIdentifiers, postId: string) => {
  console.info('submitPostForReviewToOrgBoard', boardId, postId);
}


export const submitPostForReview = async (
  supabase: SupabaseClient,
  boardId: BoardIdentifiers,
  postId: string,
  userId: string,
  timeToExpirationInSeconds: number,
) => {
  console.info('submitPostForReview', boardId, postId);

  if (boardId.boardOwnerType === 'user') {
    await submitPostForReviewToUserBoard(supabase, boardId, postId, userId, timeToExpirationInSeconds);
  } else {
    await submitPostForReviewToOrgBoard(supabase, boardId, postId);
  }
}
