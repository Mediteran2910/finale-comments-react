import { useState } from "react";
import { useComments } from "../../../hooks/useComments";
import React from "react";
import CommentCard from "../../organism/commentCard/CommentCard";
import Replies from "../../organism/replies/Replies";
import AddCommentElement from "../../organism/addCommentElement/AddCommentElement";
import "./commentsThread.css";
import LoadingModal from "../../../modal/LoadingModal";
import { useAPI } from "../../../hooks/useAPI";
import { edit } from "../../../utils/editComment";
import {
  requestObjects,
  requestUrls,
  staticUrls,
} from "../../../services/requestObjects";
import { useReducer } from "react";
import { commentsReducer } from "../../../hooks/commentsReducer";
import { useEffect } from "react";
import { addNewComment } from "../../../utils/addComment";
import { useCallback } from "react";

const CommentsThread = React.memo(() => {
  const { commentsData, setCommentsData, loading } = useComments();
  const { isLoading, isError, makeApiRequest } = useAPI();
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isLiked, setIsLiked] = useState("neutral");

  const [state, dispatch] = useReducer(commentsReducer, {
    otherUsers: [],
    currentUser: {},
  });

  useEffect(() => {
    if (commentsData) {
      dispatch({ type: "SET_COMMENTS_DATA", payload: commentsData });
    }
  }, [commentsData]);

  const [isEditing, setIsEditing] = useState(null);
  const [editInitialText, setEditInitialText] = useState("");

  const addComment = useCallback(async () => {
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
        setCommentText("");
        console.log("Response is ok, new comment added");
      } else {
        console.error("Failed to add personal comment on the backend");
      }
    }
  }, [commentText, dispatch, makeApiRequest]);

  const startReplying = (user) => {
    setReplyingTo((prevReplying) =>
      prevReplying !== user.id ? user.id : null
    );
  };

  const addReply = useCallback(
    async (user) => {
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
          setCommentText("");
          setReplyingTo(null);
        }
      }
    },
    [commentText, dispatch, makeApiRequest]
  );

  const handleEdit = useCallback((id, content) => {
    setIsEditing(id);
    setEditInitialText(content);
    console.log(id);
  }, []);

  const editComment = useCallback(
    async (user) => {
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
      }
      setEditInitialText("");
      setIsEditing(null);
    },
    [editInitialText, dispatch, makeApiRequest]
  );

  const incrementScore = useCallback(
    async (user) => {
      const url = requestUrls(user).likesUrl;
      let newScore = user.score + 1;

      if (isLiked === "neutral" || isLiked === "disliked") {
        const response = await makeApiRequest(
          url,
          requestObjects.patchRequest,
          { newScore }
        );

        if (response) {
          dispatch({ type: "UPDATE_SCORE", userId: user.id, newScore });
          console.log("Response is ok, and likes are updated.");
        }
      }
      setIsLiked((prevLike) => (prevLike === "disliked" ? "neutral" : "liked"));
    },
    [isLiked, dispatch, makeApiRequest]
  );

  const decrementScore = useCallback(
    async (user) => {
      const url = requestUrls(user).likesUrl;
      let newScore = user.score - 1;

      if (isLiked === "neutral" || isLiked === "liked") {
        const response = await makeApiRequest(
          url,
          requestObjects.patchRequest,
          { newScore }
        );

        if (response) {
          dispatch({ type: "UPDATE_SCORE", userId: user.id, newScore });
          console.log("Response is ok, and likes are updated.");
        }
      }
      setIsLiked((prevLike) => (prevLike === "liked" ? "neutral" : "disliked"));
    },
    [isLiked, dispatch, makeApiRequest]
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

  if (loading === true) {
    return <LoadingModal />;
  }

  if (isLoading) {
    return <p>LOADING...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }
  return (
    <>
      {state.otherUsers.map((user) => (
        <div className="comment-reply-wrapp" key={user.id}>
          <CommentCard
            user={user}
            handleEdit={handleEdit}
            isEditing={isEditing}
            editComment={editComment}
            replyingTo={replyingTo}
            incrementScore={incrementScore}
            decrementScore={decrementScore}
            addReply={addReply}
            currentUser={commentsData.currentUser}
            handleDeleteComment={handleDeleteComment}
            setCommentText={setCommentText}
            startReplying={startReplying}
          />

          {user.replies?.length > 0 && (
            <Replies
              user={user}
              handleEdit={handleEdit}
              isEditing={isEditing}
              editInitialText={editInitialText}
              editComment={editComment}
              replyingTo={replyingTo}
              incrementScore={incrementScore}
              decrementScore={decrementScore}
              currentUser={commentsData.currentUser}
              handleDeleteComment={handleDeleteComment}
            />
          )}
        </div>
      ))}
      <AddCommentElement
        onClick={addComment}
        currentUser={commentsData.currentUser}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
      />
    </>
  );
});

export default CommentsThread;
