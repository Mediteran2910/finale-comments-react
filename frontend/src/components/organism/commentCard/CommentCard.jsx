import React, { useCallback, useContext } from "react";
import UserInfo from "../../moleculas/userInfo/UserInfo";
import CommentText from "../../moleculas/commentText/CommentText";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import { ReplyingToContext } from "../../../context/ReplyingContext";
import "./commentCard.css";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import { sendData } from "../../../services/sendData";
import { useComments } from "../../../hooks/useComments";

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
  }) => {
    const { replyingTo, setReplyingTo } = useContext(ReplyingToContext);

    const startReplying = useCallback(() => {
      setReplyingTo((prevReplying) =>
        prevReplying !== user.id ? user.id : null
      );
    }, [setReplyingTo, user.id]);

    const addReply = async (e) => {
      e.preventDefault();
      const newPersonalReply = {
        content: commentText,
        replyingTo: user.user.username,
      };
      const urlAddReply = `http://localhost:8000/comments/${user.id}/replies`;
      if (commentText !== "") {
        const response = await sendData(urlAddReply, newPersonalReply);
        if (response) {
          const { setCommentsData } = useComments();
          setCommentsData((prevData) => {
            const updatedCommentObj = prevData.otherUsers.map((comment) => {
              if (comment.id === user.id) {
                return {
                  ...comment,
                  replies: [...comment.replies, response],
                };
              }
              return comment;
            });
            return {
              ...prevData,
              otherUsers: updatedCommentObj,
            };
          });
          setCommentText("");
          setReplyingTo(null);
        } else {
          console.error("Failed to add reply on the backend", error);
        }
      }
      return;
    };

    return (
      <>
        {isEditing === user.id ? (
          <AddCommentElement
            value={editInitialText}
            onChange={(e) => setEditInitialText(e.target.value)}
            onClick={editComment}
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
            />
          </div>
        )}

        {replyingTo === user.id && (
          <AddCommentElement
            onClick={addReply}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        )}
      </>
    );
  }
);

export default CommentCard;
