import type { Comment } from 'estree';

type NonNullish<T extends any> = T extends null
  ? never
  : T extends undefined
    ? never
    : T;

type NonNullishProps<T extends Comment> = {
  [K in keyof T]-?: NonNullish<T[K]>;
};

export type NonNullishComment = NonNullishProps<Comment>;
