import React, { useCallback, useState } from "react";
import UserInfo from "../../moleculas/userInfo/UserInfo";
import CommentText from "../../moleculas/commentText/CommentText";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import "./commentCard.css";
import AddCommentElement from "../addCommentElement/AddCommentElement";

const CommentCard = React.memo(
  ({
    user,
    handleEdit,
    editInitialText,
    setEditInitialText,
    editComment,
    replyingTo,
    isEditing,
    addReply,
    handleScoreChange,
    currentUser,
    handleDeleteComment,
    startReplying,
  }) => {
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
              handleEdit={() => handleEdit(user.id, user.content)}
              isEditing={isEditing}
              editInitialText={editInitialText}
              handleScoreChange={handleScoreChange}
              handleDeleteComment={handleDeleteComment}
              startReplying={() => startReplying(user)}
            />
          </div>
        )}

        {replyingTo === user.id && (
          <AddCommentElement
            onClick={(commentText) => addReply(user, commentText)}
            isEditing={isEditing}
            currentUser={currentUser}
          />
        )}
      </>
    );
  }
);

export default CommentCard;
