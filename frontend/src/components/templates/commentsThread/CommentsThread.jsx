import { useState } from "react";
import { useComments } from "../../../hooks/useComments";
import React from "react";
import CommentCard from "../../organism/commentCard/CommentCard";
import Replies from "../../organism/replies/Replies";
import AddCommentElement from "../../organism/addCommentElement/AddCommentElement";
import "./commentsThread.css";
import LoadingModal from "../../../modal/LoadingModal";
import { useAPI } from "../../../hooks/useAPI";
import {
  requestObjects,
  requestUrls,
  staticUrls,
} from "../../../services/requestObjects";
import { useCallback } from "react";

const CommentsThread = React.memo(() => {
  const { dispatch, error, loading, state, currentUser } = useComments();

  const { isLoading, isError, makeApiRequest } = useAPI();
  const [replyingTo, setReplyingTo] = useState(null);

  const [isEditing, setIsEditing] = useState(null);
  const [editInitialText, setEditInitialText] = useState("");

  const addComment = useCallback(
    async (commentText) => {
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
    },
    [dispatch, makeApiRequest]
  );

  const startReplying = (user) => {
    setReplyingTo((prevReplying) =>
      prevReplying !== user.id ? user.id : null
    );
  };

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
    [dispatch, makeApiRequest, setReplyingTo]
  );

  const handleEdit = useCallback(
    (id, content) => {
      setIsEditing(id);
      setEditInitialText(content);
      console.log(id);
    },
    [setIsEditing, setEditInitialText]
  );

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
    [dispatch, makeApiRequest]
  );

  const handleScoreChange = useCallback(
    async (user, increment) => {
      const url = requestUrls(user).likesUrl;
      let isLiked = true;
      let newScore = user.score + (increment ? 1 : -1);

      const response = await makeApiRequest(url, requestObjects.patchRequest, {
        newScore,
      });

      if (response) {
        dispatch({
          type: "UPDATE_SCORE",
          userId: user.id,
          newScore,
          isLiked: increment,
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

  if (loading === true) {
    return <LoadingModal />;
  }

  // if (isLoading) {
  //   return <p>LOADING...</p>;
  // }

  // if (isError) {
  //   return <p>Error...</p>;
  // }
  return (
    <>
      {state.map((user) => (
        <div className="comment-reply-wrapp" key={user.id}>
          <CommentCard
            user={user}
            handleEdit={handleEdit}
            isEditing={isEditing}
            editComment={editComment}
            replyingTo={replyingTo}
            handleScoreChange={handleScoreChange}
            addReply={addReply}
            currentUser={currentUser}
            handleDeleteComment={handleDeleteComment}
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
              handleScoreChange={handleScoreChange}
              currentUser={currentUser}
              handleDeleteComment={handleDeleteComment}
            />
          )}
        </div>
      ))}
      <AddCommentElement
        onClick={addComment}
        currentUser={currentUser}
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
      />
    </>
  );
});

export default CommentsThread;
