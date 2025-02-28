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
    replyingTo,
    addReply,
    incrementScore,
    decrementScore,
    currentUser,
    handleDeleteComment,
    startReplying,
  }) => {
    const { isLoading, isError, makeApiRequest } = useAPI();

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
            onClick={() => editComment(user)}
            isEditing={isEditing}
            currentUser={currentUser}
          />
        ) : (
          <div className="comment-card">
            <UserInfo user={user} />
            <CommentText user={user} />
            <ButtonsWrapper
              user={user}
              commentText={commentText}
              setCommentText={setCommentText}
              handleEdit={() => handleEdit(user.id, user.content)}
              isEditing={isEditing}
              editInitialText={editInitialText}
              setEditInitialText={user.id.content}
              incrementScore={incrementScore}
              decrementScore={decrementScore}
              handleDeleteComment={handleDeleteComment}
              startReplying={() => startReplying(user)}
            />
          </div>
        )}

        {replyingTo === user.id && (
          <AddCommentElement
            onClick={() => addReply(user)}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            isEditing={isEditing}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }
);

export default CommentCard;
