export const edit = (setCommentsData, isEditing, setIsEditing, response) => {
  setCommentsData((prevData) => ({
    ...prevData,
    otherUsers: prevData.otherUsers.map((comment) => {
      if (comment.id === isEditing) {
        return { ...comment, content: response.content };
      }

      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map((reply) =>
            reply.id === isEditing
              ? { ...reply, content: response.content }
              : reply
          ),
        };
      }
      return comment;
    }),
  }));

  setIsEditing(null);
};
