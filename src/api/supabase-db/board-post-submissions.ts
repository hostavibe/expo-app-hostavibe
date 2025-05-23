import { SupabaseClient } from "@supabase/supabase-js";


const BOARD_POST_SUBMISSIONS_TABLE = 'board_post_submissions';


export type UserBoardPostSubmissionItem = {
  id: string;
  submitted_user_post_id: string;
  submitted_for_board_id: string;
  submitted_for_screen_id?: string;
  submitted_at: string;
  approved_at?: string;
  approved_by_user_id?: string;
  rejected_at?: string;
  rejected_reason?: string;
  rejected_by_user_id?: string;
}

export type UserBoardPostSubmissionAdd = {
  submitted_user_post_id: string;
  submitted_for_board_id: string;
}

export type UserScreenPostSubmissionAdd = {
  submitted_user_post_id: string;
  submitted_for_board_id: string;
  submitted_for_screen_id: string;
}


export const fetchUserBoardPostSubmissions = async (supabase: SupabaseClient, boardUuid: string): Promise<UserBoardPostSubmissionItem[]> => {
  const { data, error } = await supabase
    .from(BOARD_POST_SUBMISSIONS_TABLE)
    .select('*')
    .eq('submitted_for_board_id', boardUuid)
    .order('submitted_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};


export const addUserBoardPostSubmission = async (supabase: SupabaseClient, boardPostSubmission: UserBoardPostSubmissionAdd) => {

  const { data, error } = await supabase
    .from(BOARD_POST_SUBMISSIONS_TABLE)
    .insert(boardPostSubmission);

  if (error) {
    throw error;
  }

  return data;
};


export const addUserScreenPostSubmission = async (supabase: SupabaseClient, screenPostSubmission: UserScreenPostSubmissionAdd) => {

  const { data, error } = await supabase
    .from(BOARD_POST_SUBMISSIONS_TABLE)
    .insert(screenPostSubmission);

  if (error) {
    throw error;
  }

  return data;
};

export const approveBoardPostSubmission = async (supabase: SupabaseClient, submissionId: string, userId: string) => {
  console.log("APPROVING SUBMISSION", submissionId, userId);
  
  const { data, error } = await supabase
    .from(BOARD_POST_SUBMISSIONS_TABLE)
    .update({
      approved_at: new Date().toISOString(),
      approved_by_user_id: userId,
      rejected_at: null,
      rejected_reason: null,
      rejected_by_user_id: null
    })
    .eq('id', submissionId)
    .select();

  console.log("APPROVE RESULT", data, error);

  if (error) {
    throw error;
  }

  return data;
};

export const rejectBoardPostSubmission = async (supabase: SupabaseClient, submissionId: string, userId: string, reason: string) => {
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from(BOARD_POST_SUBMISSIONS_TABLE)
    .update({
      rejected_at: now,
      rejected_reason: reason,
      rejected_by_user_id: userId,
      approved_at: null,
      approved_by_user_id: null
    })
    .eq('id', submissionId);

  if (error) {
    throw error;
  }

  return data;
};
