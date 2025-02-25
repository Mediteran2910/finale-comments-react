export const addNewComment = (setCommentsData, setCommentText, response) => {
  setCommentsData((prevData) => ({
    ...prevData,
    otherUsers: [...prevData.otherUsers, response],
  }));
  setCommentText("");
};
