export const requestObjects = {
  postRequest: {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  },
  deleteRequest: {
    method: "DELETE",
  },
  putRequest: {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  },
  patchRequest: {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  },
};

export const requestUrls = (user) => ({
  likesUrl: `http://localhost:8000/comments/${user.id}/like`,
});
