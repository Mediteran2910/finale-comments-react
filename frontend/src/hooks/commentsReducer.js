export const commentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMENTS_DATA":
      return action.payload;

    case "ADD_COMMENT":
      return [...state, action.payload];

    case "ADD_REPLY":
      return state.map((comment) =>
        comment.id === action.parentId
          ? { ...comment, replies: [...comment.replies, action.payload] }
          : comment
      );

    case "UPDATE_SCORE":
      return state.map((comment) => ({
        ...comment,
        score:
          comment.id === action.userId ? action.newScore + 1 : comment.score,
        isLiked: action.isLiked,
        replies: comment.replies.map((reply) =>
          reply.id === action.userId
            ? { ...reply, score: action.newScore, isLiked: action.isLiked }
            : reply
        ),
      }));

    case "EDIT_COMMENT_OR_REPLY":
      return state.map((comment) => {
        if (comment.id === action.commentId) {
          return { ...comment, content: action.updatedContent };
        }
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === action.commentId
              ? { ...reply, content: action.updatedContent }
              : reply
          ),
        };
      });

    case "DELETE_COMMENT":
      return state
        .map((comment) => {
          if (comment.id === action.commentId) {
            return null;
          } else {
            return {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== action.commentId
              ),
            };
          }
        })
        .filter(Boolean);

    default:
      return state;
  }
};
