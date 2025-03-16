import { Comment } from "../types";

export type UpdateCommentData = Partial<Omit<Comment, "id" | "replies">>;
type Action<T, D> = { type: T } & D;

type Actions =
  | Action<"INIT_DATA", { payload: Array<Comment> }>
  | Action<"ADD_COMMENT", { payload: Comment; parentId: string | null }>
  | Action<"UPDATE", { commentId: string; payload: UpdateCommentData }>
  | Action<"DELETE_COMMENT", { commentId: string }>;

const recursiveUpdate = (
  id: string,
  data: UpdateCommentData,
  comments: Array<Comment>,
) => {
  return comments.map((c) => {
    if (c.id === id) return { ...c, ...data };
    if (!c.replies) return c;
    return { ...c, replies: recursiveUpdate(id, data, c.replies) };
  });
};

const recursiveDelete = (id: string, comments: Array<Comment>) => {
  return comments
    .filter((c) => c.id !== id)
    .map((c) => ({
      ...c,
      replies: c.replies && recursiveDelete(id, c.replies),
    }));
};

const recursiveCreate = (
  parentId: string,
  data: Comment,
  comments: Array<Comment>,
) => {
  return comments.map((c) => {
    if (c.id === parentId)
      return { ...c, replies: (c.replies ?? []).concat([data]) };
    if (!c.replies) return c;
    return { ...c, replies: recursiveCreate(parentId, data, c.replies) };
  });
};

export const commentsReducer = (state: Array<Comment>, action: Actions) => {
  switch (action.type) {
    case "INIT_DATA":
      return action.payload;

    case "ADD_COMMENT":
      return action.parentId === null
        ? [...state, action.payload]
        : recursiveCreate(action.parentId, action.payload, state);

    case "UPDATE":
      return recursiveUpdate(action.commentId, action.payload, state);

    case "DELETE_COMMENT":
      return recursiveDelete(action.commentId, state);

    default:
      return state;
  }
};
