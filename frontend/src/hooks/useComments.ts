import { useCallback, useState, useEffect, useReducer } from "react";

import { fetchComments } from "@services/dataFetch";
import {
  requestObjects,
  requestUrls,
  staticUrls,
} from "@services/requestObjects";
import { User } from "@types";
import { makeApiRequest } from "@utils/makeApiRequest";

import { commentsReducer } from "./commentsReducer";

export function useComments() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer(commentsReducer, []);
  const [currentUser, setCurrentUser] = useState<User>();

  const addComment = useCallback(
    async (commentText: string) => {
      const url = staticUrls.addCommentUrl;
      const newPersonalComment = { content: commentText };

      const response = await makeApiRequest(
        url,
        requestObjects.post,
        newPersonalComment,
      );

      if (response) {
        dispatch({ type: "ADD_COMMENT", parentId: null, payload: response });
      } else {
        console.error("Failed to add personal comment on the backend");
      }
    },
    [dispatch, makeApiRequest],
  );

  const handleCreateComment = useCallback(
    async (
      parentId: string,
      data: { content: string; replyingTo?: string },
    ) => {
      const url = requestUrls({ id: parentId }).addReplyUrl;

      const response = await makeApiRequest(url, requestObjects.post, data);

      if (response) {
        dispatch({ type: "ADD_COMMENT", parentId, payload: response });
      }
    },
    [dispatch, makeApiRequest],
  );

  const handleUpdateComment = useCallback(
    async (user: { id: string; content: string }, editInitialText: string) => {
      const updatedCommentObj = { content: editInitialText };
      const url = requestUrls(user).editUrl;

      if (editInitialText !== user.content) return;
      try {
        const response = await makeApiRequest(
          url,
          requestObjects.patch,
          updatedCommentObj,
        );
        if (response) {
          dispatch({
            type: "UPDATE",
            commentId: user.id,
            payload: { content: editInitialText },
          });
        } else {
          console.error("Failed to update comment or reply on backend");
        }
      } catch (error) {
        console.error("Edit failed:", error);
      }
    },
    [dispatch, makeApiRequest],
  );

  /** @todo merge with update comment **/
  const handleScoreChange = useCallback(
    async (
      comment: { id: string; score: number; isLiked: boolean | null },
      increment: boolean | null,
    ) => {
      const url = requestUrls(comment).likesUrl;

      if (comment.isLiked === increment) return;

      const score = (comment.isLiked === null ? 1 : 2) * (increment ? 1 : -1);
      const newScore = { score: comment.score + score, isLiked: increment };

      const response = await makeApiRequest(url, requestObjects.patch, {
        newScore,
      });

      if (response) {
        dispatch({ type: "UPDATE", commentId: comment.id, payload: newScore });
        console.log("Response is ok, and likes are updated.");
      }
    },
    [dispatch, makeApiRequest],
  );

  const handleDeleteComment = useCallback(
    async (id: string) => {
      const url = requestUrls({ id }).deleteUrl;

      const response = await makeApiRequest(url, requestObjects.delete);
      if (response) {
        dispatch({ type: "DELETE_COMMENT", commentId: id });
      } else {
        console.error("Failed to delete");
      }
    },
    [dispatch, makeApiRequest],
  );

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

  return {
    state,
    dispatch,
    loading,
    error,
    currentUser,
    handleScoreChange,
    handleCreateComment,
    handleDeleteComment,
    handleUpdateComment,
    addComment,
  };
}
