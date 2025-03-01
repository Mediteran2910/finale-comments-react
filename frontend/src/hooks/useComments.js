import { useState, useEffect, useReducer } from "react";
import { fetchComments } from "../services/dataFetch";
import { commentsReducer } from "./commentsReducer";

export function useComments() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(commentsReducer, []);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    async function loadComments() {
      try {
        setLoading(true);
        console.log("im fetching useCommentss");
        const data = await fetchComments();
        setCurrentUser(data.currentUser);
        dispatch({ type: "SET_COMMENTS_DATA", payload: data.otherUsers });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, []);
  return {
    state,
    dispatch,
    loading,
    error,
    currentUser,
  };
}
