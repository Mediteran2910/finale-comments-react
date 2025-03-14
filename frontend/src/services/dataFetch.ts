import { Comment, User } from "../types";

type CommentResponse = {
  currentUser: User;
  otherUsers: Array<Comment>;
};

export async function fetchComments(): Promise<CommentResponse | null> {
  try {
    const response = await fetch("http://localhost:8000/comments");
    return response.json();
  } catch (error) {
    console.error("Erro while fetching", error);
    return null;
  }
}
