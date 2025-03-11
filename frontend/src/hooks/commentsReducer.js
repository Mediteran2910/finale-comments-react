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
          : {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === action.parentId
                  ? { ...reply, replies: [...reply.replies, action.payload] }
                  : reply
              ),
            }
      );

    case "UPDATE_SCORE":
      return state.map((comment) => ({
        ...comment,
        score: comment.id === action.userId ? action.newScore : comment.score,
        isLiked:
          comment.id === action.userId ? action.isLiked : comment.isLiked,
        replies: comment.replies.map((reply) =>
          reply.id === action.userId
            ? { ...reply, score: action.newScore, isLiked: action.isLiked }
            : {
                ...reply,
                replies: reply.replies.map((nestedReply) =>
                  nestedReply.id === action.userId
                    ? {
                        ...nestedReply,
                        score: action.newScore,
                        isLiked: action.isLiked,
                      }
                    : nestedReply
                ),
              }
        ),
      }));

    case "EDIT_COMMENT_OR_REPLY":
      const updateReplies = (replies, commentId, updatedContent) => {
        return replies.map((reply) => {
          if (reply.id === commentId) {
            return { ...reply, content: updatedContent };
          }
          if (reply.replies?.length) {
            return {
              ...reply,
              replies: updateReplies(reply.replies, commentId, updatedContent),
            };
          }
          return reply;
        });
      };

      return state.map((comment) => {
        if (comment.id === action.commentId) {
          return { ...comment, content: action.updatedContent };
        }
        return {
          ...comment,
          replies: updateReplies(
            comment.replies,
            action.commentId,
            action.updatedContent
          ),
        };
      });

    case "DELETE_COMMENT":
      return state
        .filter((comment) => comment.id !== action.commentId)
        .map((comment) => ({
          ...comment,
          replies: comment.replies
            .filter((reply) => reply.id !== action.commentId)
            .map((reply) => ({
              ...reply,
              replies: reply.replies.filter(
                (nestedReply) => nestedReply.id !== action.commentId
              ),
            })),
        }));

    default:
      return state;
  }
};
