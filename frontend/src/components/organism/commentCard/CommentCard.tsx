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
  editComment: (
    user: { id: string; content: string },
    editInitialText: string,
  ) => Promise<void>;
  handleScoreChange: unknown;
  handleDeleteComment: unknown;
  submitComment: (
    parentId: string,
    commentText: string,
    username: string,
  ) => Promise<void>;
};

const CommentCard = React.memo(function CommentCard({
  comment,
  editComment,
  handleScoreChange,
  handleDeleteComment,
  submitComment,
}: Props) {
  const [replyingToComment, setReplyingToComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <AddCommentElement onSubmit={(text) => editComment(comment, text)} />
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
            nestedReply={{}}
            user={comment}
            handleEdit={() => setIsEditing(true)}
            handleScoreChange={handleScoreChange}
            handleDeleteComment={handleDeleteComment}
            startReplying={() => setReplyingToComment(true)}
          />
        </div>
      )}

      {replyingToComment && (
        <AddCommentElement
          onSubmit={(text) =>
            submitComment(comment.id, comment.user.username, text)
          }
        />
      )}
    </>
  );
});

export default CommentCard;
