export const requestObjects: Record<string, RequestInit> = {
  postRequest: {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  },
  deleteRequest: {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  },
  putRequest: {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  },
  patchRequest: {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  },
} as const;

export const requestUrls = (user: { id: string }) => ({
  likesUrl: `http://localhost:8000/comments/${user.id}/like`,
  addReplyUrl: `http://localhost:8000/comments/${user.id}/replies`,
  deleteUrl: `http://localhost:8000/comment/delete/${user.id}`,
  editUrl: `http://localhost:8000/comment/edit/${user.id}`,
});

export const staticUrls = {
  addCommentUrl: "http://localhost:8000/comments",
};
