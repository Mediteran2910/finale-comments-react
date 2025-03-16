import React, { useCallback, useState } from "react";
import UserInfo from "@molecules/userInfo/UserInfo";
import CommentText from "@molecules/commentText/CommentText";
import ButtonsWrapper from "@molecules/buttonsWrapper/ButtonWrapper";
import "./commentCard.css";
import AddCommentElement from "@organizms/addCommentElement/AddCommentElement";
import { Comment } from "@types";

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
    data: {
      content: string;
      replyingTo: string;
    },
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

  const handleNewComment = useCallback(
    async (content: string) => {
      await handleCreateComment(comment.id, {
        replyingTo: comment.user.username,
        content,
      });
      setIsReplying(false);
    },
    [handleCreateComment, comment],
  );

  const handleEdit = useCallback(
    async (content: string) => {
      await handleUpdateComment(comment, content);
      setIsEditing(false);
    },
    [handleUpdateComment, comment],
  );

  return (
    <>
      {isEditing ? (
        <AddCommentElement
          avatar={comment.user.image.png}
          buttonText="Edit"
          intialValue={comment.content}
          onSubmit={handleEdit}
          placeholder=""
        />
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
            handleScoreChange={(v) => handleScoreChange(comment, v)}
            handleDeleteComment={handleDeleteComment}
            onTriggerEdit={() => setIsEditing(true)}
            onTriggerReply={() => setIsReplying(true)}
          />
        </div>
      )}

      {isReplying && (
        <AddCommentElement
          avatar={comment.user.image.png}
          buttonText="reply"
          onSubmit={handleNewComment}
          placeholder="Add an reply..."
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
