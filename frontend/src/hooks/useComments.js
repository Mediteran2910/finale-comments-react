import { useState, useEffect } from "react";
import { fetchComments } from "../services/dataFetch";

export function useComments() {
  const [commentsData, setCommentsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadComments() {
      try {
        setLoading(true);
        console.log("im fetching useCommentss");
        const data = await fetchComments();
        setCommentsData(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, []);
  return {
    commentsData,
    setCommentsData,
    loading,
    error,
  };
}
