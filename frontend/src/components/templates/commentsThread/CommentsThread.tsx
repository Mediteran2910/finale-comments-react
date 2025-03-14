import { useComments } from "../../../hooks/useComments";
import React from "react";
import CommentCard from "../../organism/commentCard/CommentCard";
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

const CommentsThread = React.memo(function CommentsThread() {
  const { dispatch, loading, state, currentUser } = useComments();

  const addComment = useCallback(
    async (commentText: string) => {
      const url = staticUrls.addCommentUrl;
      const newPersonalComment = { content: commentText };

      const response = await makeApiRequest(
        url,
        requestObjects.postRequest,
        newPersonalComment,
      );

      if (response) {
        dispatch({ type: "ADD_COMMENT", payload: response });
      } else {
        console.error("Failed to add personal comment on the backend");
      }
    },
    [dispatch, makeApiRequest],
  );

  const addReply = useCallback(
    async (user: { id: string; username: string }, commentText: string) => {
      const url = requestUrls(user).addReplyUrl;
      const newReply = {
        content: commentText,
        replyingTo: user.username,
      };

      const response = await makeApiRequest(
        url,
        requestObjects.postRequest,
        newReply,
      );

      if (response) {
        dispatch({ type: "ADD_REPLY", parentId: user.id, payload: response });
      }
    },
    [dispatch, makeApiRequest],
  );

  const editComment = useCallback(
    async (user: { id: string; content: string }, editInitialText: string) => {
      const updatedCommentObj = { content: editInitialText };
      const url = requestUrls(user).editUrl;

      if (editInitialText !== user.content) return;
      try {
        const response = await makeApiRequest(
          url,
          requestObjects.patchRequest,
          updatedCommentObj,
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
    },
    [dispatch, makeApiRequest],
  );

  const handleScoreChange = useCallback(
    async (
      user: { id: string; score: number; isLiked: boolean | null },
      increment: boolean | null,
    ) => {
      console.log(user);
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
    [dispatch, makeApiRequest],
  );

  const handleDeleteComment = useCallback(
    async (user: { id: string }, id: string) => {
      const url = requestUrls(user).deleteUrl;

      const response = await makeApiRequest(url, requestObjects.deleteRequest);
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
      {state.map((user) => (
        <div className="comment-reply-wrapp" key={user.id}>
          <CommentCard
            user={user}
            handleScoreChange={(v: boolean) => handleScoreChange(user, v)}
            addReply={addReply}
            currentUser={currentUser}
            handleDeleteComment={handleDeleteComment}
            editComment={editComment}
          />

          {user.replies.map((subComment) => {
            return (
              <div key={subComment.id} style={{ paddingLeft: "10rem" }}>
                <CommentCard
                  user={subComment}
                  addReply={addReply}
                  handleScoreChange={(v: boolean) => handleScoreChange(user, v)}
                  currentUser={currentUser}
                  handleDeleteComment={handleDeleteComment}
                  editComment={editComment}
                />

                <div style={{ paddingLeft: "10rem" }}>
                  {subComment.replies.map((replyNest: any) => (
                    <CommentCard
                      addReply={""}
                      key={replyNest.id}
                      user={replyNest}
                      handleScoreChange={(v: boolean) =>
                        handleScoreChange(replyNest, v)
                      }
                      currentUser={currentUser}
                      handleDeleteComment={handleDeleteComment}
                      editComment={editComment}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <AddCommentElement onSubmit={addComment} />
    </>
  );
});

export default CommentsThread;

///LOKALNO STATE TI MOZE, U SLUCAJU DA NIJE GENERALNI STATE(DATA)
///PAZI NA ISLOADING AKO NIJE INICJALNI RENDER, SCOUPAJ IS LOADING NA LOKALNOJ RAZINI, TJ DI SE POZIVA FUNKCIJA(AKO IMA SMISLA)
///CUSTOM HOOK PRIHVACA SVE I SVASTA, ZATO SE I ZOVE CUSTOM
