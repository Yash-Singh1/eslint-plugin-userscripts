import type { Comment } from 'estree';

type NonNullish<T> = T extends null ? never : T extends undefined ? never : T;

type NonNullishProps<T extends Comment> = {
  [K in keyof T]-?: NonNullish<T[K]>;
};

export type NonNullishComment = NonNullishProps<Comment>;

export function isNonNullishComment(
  comment: Comment
): comment is NonNullishComment {
  return comment.loc !== null;
}
