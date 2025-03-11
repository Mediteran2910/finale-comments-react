import { useState } from "react";
import { useComments } from "../../../hooks/useComments";
import React from "react";
import CommentCard from "../../organism/commentCard/CommentCard";
import Replies from "../../organism/replies/Replies";
import AddCommentElement from "../../organism/addCommentElement/AddCommentElement";
import "./commentsThread.css";
import { makeApiRequest } from "../../../utils/makeApiRequest";
import {
  requestObjects,
  requestUrls,
  staticUrls,
} from "../../../services/requestObjects";
import { useCallback } from "react";
import { Modal } from "../../../modal/Modal";
import "../../../modal/loadingModal.css";
import NestedReplies from "../../organism/nestedReplies/nestedReplies";

const CommentsThread = React.memo(() => {
  const { dispatch, error, loading, state, currentUser } = useComments();

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
    async (user, commentText, fn) => {
      if (commentText !== "") {
        const url = requestUrls(user).addReplyUrl;
        const newReply = {
          content: commentText,
          replyingTo: user.user.username,
        };

        const response = await makeApiRequest(
          url,
          requestObjects.postRequest,
          newReply
        );

        if (response) {
          console.log("Response is ok, trying to update front");
          dispatch({ type: "ADD_REPLY", parentId: user.id, payload: response });

          fn();
        }
      }
    },
    [dispatch, makeApiRequest]
  );

  const editComment = useCallback(
    async (user, editInitialText, setEditInitialText, setIsEditing) => {
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

  if (loading === true) {
    return <Modal loadingModal={true} />;
  }

  return (
    <>
      {state.map((user) => (
        <div className="comment-reply-wrapp" key={user.id}>
          <CommentCard
            user={user}
            handleScoreChange={handleScoreChange}
            addReply={addReply}
            currentUser={currentUser}
            handleDeleteComment={handleDeleteComment}
            editComment={editComment}
          />

          {user.replies?.length > 0 && (
            <Replies
              user={user}
              addReply={addReply}
              handleScoreChange={handleScoreChange}
              currentUser={currentUser}
              handleDeleteComment={handleDeleteComment}
              editComment={editComment}
            />
          )}

          {user.replies
            ?.filter((reply) => reply.replies?.length > 0)
            .map((replyNest) => (
              <NestedReplies
                user={replyNest}
                handleScoreChange={handleScoreChange}
                currentUser={currentUser}
                handleDeleteComment={handleDeleteComment}
                editComment={editComment}
              />
            ))}
        </div>
      ))}

      <AddCommentElement onClick={addComment} currentUser={currentUser} />
    </>
  );
});

export default CommentsThread;

///LOKALNO STATE TI MOZE, U SLUCAJU DA NIJE GENERALNI STATE(DATA)
///PAZI NA ISLOADING AKO NIJE INICJALNI RENDER, SCOUPAJ IS LOADING NA LOKALNOJ RAZINI, TJ DI SE POZIVA FUNKCIJA(AKO IMA SMISLA)
///CUSTOM HOOK PRIHVACA SVE I SVASTA, ZATO SE I ZOVE CUSTOM
