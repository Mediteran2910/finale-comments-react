export const addNewReply = (
  setCommentsData,
  setCommentText,
  setReplyingTo,
  user,
  response
) => {
  setCommentsData((prevData) => {
    const updatedCommentObj = prevData.otherUsers.map((comment) => {
      if (comment.id === user.id) {
        return {
          ...comment,
          replies: [...comment.replies, response],
        };
      }
      return comment;
    });
    return {
      ...prevData,
      otherUsers: updatedCommentObj,
    };
  });
  setCommentText("");
  setReplyingTo(null);
};
