import React, { useCallback, useState } from "react";
import UserInfo from "../../moleculas/userInfo/UserInfo";
import CommentText from "../../moleculas/commentText/CommentText";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import "./commentCard.css";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import { addNewReply } from "../../../utils/addReply";
import { requestObjects, requestUrls } from "../../../services/requestObjects";
import { useAPI } from "../../../hooks/useAPI";

const CommentCard = React.memo(
  ({
    user,
    commentText,
    setCommentText,
    handleEdit,
    isEditing,
    editInitialText,
    setEditInitialText,
    editComment,
    setCommentsData,
    commentsData,
    replyingTo,
    setReplyingTo,
  }) => {
    const { isLoading, isError, makeApiRequest } = useAPI();

    const startReplying = () => {
      setReplyingTo((prevReplying) =>
        prevReplying !== user.id ? user.id : null
      );
    };

    const addReply = async () => {
      const url = requestUrls(user).addReplyUrl;
      const newPersonalReply = {
        content: commentText,
        replyingTo: user.user.username,
      };

      if (commentText !== "") {
        const response = await makeApiRequest(
          url,
          requestObjects.postRequest,
          newPersonalReply
        );
        if (response) {
          addNewReply(
            setCommentsData,
            setCommentText,
            setReplyingTo,
            user,
            response
          );
          console.log(response);
        } else {
          console.error("Failed to add reply on the backend", error);
        }
      }
      return;
    };

    if (isLoading) {
      return <p>LOADING...</p>;
    }

    if (isError) {
      return <p>Error...</p>;
    }

    return (
      <>
        {isEditing === user.id ? (
          <AddCommentElement
            value={editInitialText}
            onChange={(e) => setEditInitialText(e.target.value)}
            onClick={() => editComment(user.id)}
            commentsData={commentsData}
            setCommentsData={setCommentsData}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            isEditing={isEditing}
          />
        ) : (
          <div className="comment-card">
            <UserInfo user={user} />
            <CommentText user={user} />
            <ButtonsWrapper
              user={user}
              startReplying={startReplying}
              commentText={commentText}
              setCommentText={setCommentText}
              handleEdit={() => handleEdit(user.id, user.content)}
              isEditing={isEditing}
              editInitialText={editInitialText}
              setEditInitialText={user.id.content}
              commentsData={commentsData}
              setCommentsData={setCommentsData}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          </div>
        )}

        {replyingTo === user.id && (
          <AddCommentElement
            onClick={addReply}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            commentsData={commentsData}
            setCommentsData={setCommentsData}
            isEditing={isEditing}
          />
        )}
      </>
    );
  }
);

export default CommentCard;
