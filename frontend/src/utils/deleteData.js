export const deleteComment = (
  setCommentsData,
  setIsModalVisible,
  setId,
  id
) => {
  setCommentsData((prevData) => ({
    ...prevData,
    otherUsers: prevData.otherUsers
      .map((comment) => {
        if (comment.id === id) {
          return null;
        } else {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== id),
          };
        }
      })
      .filter(Boolean),
  }));
  setIsModalVisible(false);
  setId(null);
};
