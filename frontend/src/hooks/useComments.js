import { useState, useEffect, useReducer, useCallback } from "react";
import { fetchComments } from "../services/dataFetch";
import { commentsReducer } from "./commentsReducer";
import {
  requestObjects,
  requestUrls,
  staticUrls,
} from "../services/requestObjects";
import { makeApiRequest } from "../utils/makeApiRequest";

export function useComments() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(commentsReducer, []);
  const [currentUser, setCurrentUser] = useState();
  const [replyingTo, setReplyingTo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editInitialText, setEditInitialText] = useState("");

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

  const startReplying = (user) => {
    setReplyingTo((prevReplying) =>
      prevReplying !== user.id ? user.id : null
    );
  };

  const addComment = useCallback(
    async (commentText, setCommentText) => {
      const url = staticUrls.addCommentUrl;
      const newPersonalComment = { content: commentText };

      if (commentText !== "") {
        const response = await makeApiRequest(
          url,
          requestObjects.postRequest,
          newPersonalComment
        );

        if (response) {
          dispatch({ type: "ADD_COMMENT", payload: response });

          console.log("Response is ok, new comment added");
        } else {
          console.error("Failed to add personal comment on the backend");
        }
      }

      setCommentText("");
    },
    [dispatch, makeApiRequest]
  );

  const addReply = useCallback(
    async (user, commentText) => {
      if (commentText !== "") {
        const url = requestUrls(user).addReplyUrl;
        const newReply = { content: commentText };

        const response = await makeApiRequest(
          url,
          requestObjects.postRequest,
          newReply
        );

        if (response) {
          console.log("Response is ok, trying to update front");
          dispatch({ type: "ADD_REPLY", parentId: user.id, payload: response });

          setReplyingTo(null);
        }
      }
    },
    [dispatch, makeApiRequest]
  );

  const handleEdit = useCallback((id, content) => {
    setIsEditing(id);
    setEditInitialText(content);
    console.log(id);
    console.log(content);
  }, []);

  const editComment = useCallback(
    async (user) => {
      console.log(editInitialText);
      const updatedCommentObj = { content: editInitialText };
      const url = requestUrls(user).editUrl;

      if (editInitialText !== user.content) {
        try {
          const response = await makeApiRequest(
            url,
            requestObjects.patchRequest,
            updatedCommentObj
          );
          if (response) {
            dispatch({
              type: "EDIT_COMMENT_OR_REPLY",
              commentId: user.id,
              updatedContent: editInitialText,
            });
          } else {
            console.error("Failed to update comment or reply on backend");
          }
        } catch (error) {
          console.error("Edit failed:", error);
        }
        setEditInitialText("");
        setIsEditing(null);
      }
    },
    [dispatch, makeApiRequest]
  );

  const handleScoreChange = useCallback(
    async (user, increment) => {
      const url = requestUrls(user).likesUrl;
      let newScore = {
        score: user.score + (increment ? 1 : -1),
        isLiked: increment,
      };

      if (user.isLiked === true && !increment) {
        newScore = {
          score: user.score - 1,
          isLiked: null,
        };
      }

      if (user.isLiked === false && increment) {
        newScore = {
          score: user.score + 1,
          isLiked: null,
        };
      }

      const response = await makeApiRequest(url, requestObjects.patchRequest, {
        newScore,
      });

      if (response) {
        dispatch({
          type: "UPDATE_SCORE",
          userId: user.id,
          newScore: newScore.score,
          isLiked: newScore.isLiked,
        });
        console.log("Response is ok, and likes are updated.");
      }
    },
    [dispatch, makeApiRequest]
  );

  const handleDeleteComment = useCallback(
    async (user, id) => {
      const url = requestUrls(user).deleteUrl;

      const response = await makeApiRequest(url, requestObjects.deleteRequest);
      if (response) {
        dispatch({ type: "DELETE_COMMENT", commentId: id });
      } else {
        console.error("Failed to delete");
      }
    },
    [dispatch, makeApiRequest]
  );
  return {
    state,
    dispatch,
    loading,
    error,
    currentUser,
    addComment,
    addReply,
    handleEdit,
    editComment,
    handleDeleteComment,
    handleScoreChange,
    startReplying,
    setReplyingTo,
    replyingTo,
    isEditing,
    setIsEditing,
    editInitialText,
    setEditInitialText,
  };
}
