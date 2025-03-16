import { useComments } from "@hooks/useComments";
import React from "react";
import CommentCard from "@organizms/commentCard/CommentCard";
import AddCommentElement from "@organizms/addCommentElement/AddCommentElement";
import "./commentsThread.css";
import { makeApiRequest } from "@utils/makeApiRequest";
import {
  requestObjects,
  requestUrls,
  staticUrls,
} from "@services/requestObjects";
import { useCallback } from "react";
import { Modal } from "@molecules/modal/Modal";

const CommentsThread = React.memo(function CommentsThread() {
  const { dispatch, loading, state, currentUser } = useComments();

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

  if (loading === true) {
    return <Modal loadingModal={true} />;
  }

  return (
    <>
      {state.map((comment) => (
        <div className="comment-reply-wrapp" key={comment.id}>
          <CommentCard
            comment={comment}
            handleScoreChange={handleScoreChange}
            handleCreateComment={handleCreateComment}
            handleDeleteComment={handleDeleteComment}
            handleUpdateComment={handleUpdateComment}
          />
        </div>
      ))}

      {currentUser && (
        <AddCommentElement
          avatar={currentUser?.image.png}
          buttonText="Send"
          placeholder="Add a comment..."
          onSubmit={addComment}
        />
      )}
    </>
  );
});

export default CommentsThread;
