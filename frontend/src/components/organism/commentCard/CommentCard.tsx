import React from "react";
import UserInfo from "../../moleculas/userInfo/UserInfo";
import CommentText from "../../moleculas/commentText/CommentText";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import "./commentCard.css";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import { useState } from "react";
import { Comment } from "../../../types";

type Props = {
  comment: Comment;
  handleUpdateComment: (
    comment: { id: string; content: string },
    editInitialText: string,
  ) => Promise<void>;
  handleScoreChange: (c: Comment, v: boolean | null) => Promise<void>;
  handleDeleteComment: (id: string) => Promise<void>;
  handleCreateComment: (
    parentId: string,
    commentText: string,
    username: string,
  ) => Promise<void>;
};

const CommentCard = React.memo(function CommentCard({
  comment,
  handleUpdateComment,
  handleScoreChange,
  handleDeleteComment,
  handleCreateComment,
}: Props) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AddCommentElement onSubmit={(text) => handleUpdateComment(comment, text)} />
      ) : (
        <div className="comment-card">
          <UserInfo
            isCurrentUser={comment.isYou}
            postTime={comment.createdAt}
            image={comment.user.image.png}
            username={comment.user.username}
          />
          <CommentText user={comment} />
          <ButtonsWrapper
            comment={comment}
            onTriggerEdit={() => setIsEditing(true)}
            handleScoreChange={(v) => handleScoreChange(comment, v)}
            handleDeleteComment={handleDeleteComment}
            onTriggerReply={() => setIsReplying(true)}
          />
        </div>
      )}

      {isReplying && (
        <AddCommentElement
          onSubmit={(text) =>
            handleCreateComment(comment.id, comment.user.username, text)
          }
        />
      )}

      {comment.replies?.map((subComment) => {
        return (
          <div key={subComment.id} style={{ paddingLeft: "5rem" }}>
            <CommentCard
              comment={subComment}
              handleCreateComment={handleCreateComment}
              handleScoreChange={handleScoreChange}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
            />
          </div>
        );
      })}
    </>
  );
});

export default CommentCard;
