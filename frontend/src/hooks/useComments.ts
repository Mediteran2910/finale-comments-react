import { useState, useEffect, useReducer } from "react";

import { fetchComments } from "@services/dataFetch";
import { User } from "@types";

import { commentsReducer } from "./commentsReducer";

export function useComments() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer(commentsReducer, []);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    async function loadComments() {
      try {
        setLoading(true);
        const data = await fetchComments();
        setCurrentUser(data?.currentUser);
        dispatch({ type: "INIT_DATA", payload: data?.otherUsers ?? [] });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, []);

  return { state, dispatch, loading, error, currentUser };
}
