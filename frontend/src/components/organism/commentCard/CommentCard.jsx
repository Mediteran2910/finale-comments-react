import React from "react";
import UserInfo from "../../moleculas/userInfo/UserInfo";
import CommentText from "../../moleculas/commentText/CommentText";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import "./commentCard.css";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import { useState, useCallback } from "react";

const CommentCard = React.memo(
  ({
    user,
    editComment,
    addReply,
    handleScoreChange,
    currentUser,
    handleDeleteComment,
    nestedReply,
  }) => {
    const [replyingTo, setReplyingTo] = useState(false);
    console.log("replying to:", replyingTo, "userID:", user.id);

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmitEdit = async (user, commentText) => {
      console.log(user);
      try {
        await editComment(user, commentText);
      } catch (error) {
        console.log(error);
      }
      setIsEditing(false);
    };

    const handleSubmitReply = useCallback(
      async (user, commentText) => {
        try {
          await addReply(user, commentText);
        } catch (error) {
          console.log(error);
        }
        setReplyingTo(false);
      },
      [user, setReplyingTo]
    );

    const handleEdit = useCallback(() => {
      setIsEditing(true);
    }, [setIsEditing]);

    const showReplyBox = (user) => {
      setReplyingTo((prevReplying) =>
        prevReplying !== user.id ? user.id : false
      );
    };

    const repliesChecker = user.replies && user.replies.length > 0;

    return (
      <>
        {isEditing ? (
          <AddCommentElement
            value={user.content}
            onClick={(commentText) => handleSubmitEdit(user, commentText)}
            isEditing={isEditing}
            currentUser={currentUser}
          />
        ) : (
          <div className="comment-card">
            <UserInfo user={user} />
            <CommentText user={user} />
            <ButtonsWrapper
              user={user}
              handleEdit={handleEdit}
              isEditing={isEditing}
              handleScoreChange={handleScoreChange}
              handleDeleteComment={handleDeleteComment}
              startReplying={() => showReplyBox(user)}
              nestedReply={nestedReply}
            />

            {repliesChecker && (
              <div
                className="comment-card"
                style={{ borderLeft: "1px solid black" }}
              >
                {user.replies.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    user={reply}
                    handleScoreChange={handleScoreChange}
                    addReply={addReply}
                    currentUser={currentUser}
                    handleDeleteComment={handleDeleteComment}
                    editComment={editComment}
                    nestedReply={reply.replies.replies ? true : false}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {replyingTo === user.id && (
          <AddCommentElement
            onClick={(commentText) => handleSubmitReply(user, commentText)}
            currentUser={currentUser}
            replyingTo={replyingTo}
          />
        )}
      </>
    );
  }
);

export default CommentCard;
