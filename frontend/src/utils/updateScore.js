export const updateScore = (setCommentsData, newScore, userId) => {
  setCommentsData((prevData) => ({
    ...prevData,
    otherUsers: prevData.otherUsers.map((comment) => ({
      ...comment,
      score: comment.id === userId ? newScore : comment.score,
      replies: comment.replies?.map((reply) =>
        reply.id === userId ? { ...reply, score: newScore } : reply
      ),
    })),
  }));
};
