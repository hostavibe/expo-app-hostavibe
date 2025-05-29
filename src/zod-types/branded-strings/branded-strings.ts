import { z } from 'zod';

// GUID regex pattern
export const GUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;


// Base branded string type
export const createBrandedString = <T extends string>(prefix: T) => {
  // return z.string().refine(
  //   (val) => val.startsWith(prefix),
  //   {
  //     message: `String must start with "${prefix}"`,
  //   }
  // ).brand<T>();

  return z.string().startsWith(prefix).brand<T>();
};

// User ID type (starts with 'user_')
export const ClerkUserIdSchema = createBrandedString('user_');
export type ClerkUserId = z.infer<typeof ClerkUserIdSchema>;

// Organization ID type (starts with 'org_')
export const ClerkOrganizationIdSchema = createBrandedString('org_');
export type ClerkOrganizationId = z.infer<typeof ClerkOrganizationIdSchema>;



// User Post ID type (starts with 'user_post_')
export const UserPostIdSchema = createBrandedString('user_post_');
export type UserPostId = z.infer<typeof UserPostIdSchema>;

// Post submission ID type (starts with 'post_submission_')
export const PostSubmissionIdSchema = createBrandedString('post_submission_');
export type PostSubmissionId = z.infer<typeof PostSubmissionIdSchema>;


// Helper function to create a new ID with the correct prefix
export const createId = <T extends string>(
  prefix: T,
  id: string
): `${T}${string}` => {
  return `${prefix}${id}` as `${T}${string}`;
};
