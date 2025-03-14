import React from "react";
import UserInfo from "../../moleculas/userInfo/UserInfo";
import CommentText from "../../moleculas/commentText/CommentText";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import "./commentCard.css";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import { useState, useCallback } from "react";

type Props = {
  user: unknown;
  editComment: unknown;
  addReply: unknown;
  handleScoreChange: unknown;
  currentUser: unknown;
  handleDeleteComment: unknown;
};

const CommentCard = React.memo(function CommentCard({
  user,
  editComment,
  addReply,
  handleScoreChange,
  currentUser,
  handleDeleteComment,
}: Props) {
  const [replyingToComment, setReplyingToComment] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editInitialText, setEditInitialText] = useState("");

  const handleEdit = useCallback(
    (id, content) => {
      setIsEditing(id);
      setEditInitialText(content);
    },
    [setIsEditing, setEditInitialText],
  );

  const startCommentReply = (user) => {
    setReplyingToComment((prevReplying) =>
      prevReplying !== user.id ? user.id : null,
    );
  };

  return (
    <>
      {isEditing === user.id ? (
        <AddCommentElement
          value={editInitialText}
          onChange={(e) => setEditInitialText(e.target.value)}
          onClick={() =>
            editComment(user, editInitialText, setEditInitialText, setIsEditing)
          }
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
            startReplying={() => startCommentReply(user)}
          />
        </div>
      )}

      {replyingToComment === user.id && (
        <AddCommentElement
          onClick={(commentText) =>
            addReply(user, commentText, () => setReplyingToComment(false))
          }
          isEditing={isEditing}
          currentUser={currentUser}
          replyingToComment={replyingToComment}
        />
      )}
    </>
  );
});

export default CommentCard;
