import UserInfo from "../../moleculas/userInfo/UserInfo";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import "./replies.css";
import React from "react";
import Typography from "../../atoms/typgoraphy/typography";
import { useState, useCallback } from "react";

const Replies = React.memo(
  ({
    user,
    editComment,
    handleDeleteComment,
    currentUser,
    handleScoreChange,
    addReply,
  }) => {
    const [replyingToReply, setReplyingToReply] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editInitialText, setEditInitialText] = useState("");
    console.log(isEditing);

    const handleEdit = useCallback(
      (id, content) => {
        setIsEditing(id);
        setEditInitialText(content);
        console.log(id);
        console.log(content);
      },
      [setIsEditing, setEditInitialText]
    );

    const startNestedReply = (reply) => {
      setReplyingToReply((prevReplying) =>
        prevReplying !== reply.id ? reply.id : false
      );
    };

    return (
      <>
        {user.replies?.map((reply) =>
          isEditing === reply.id ? (
            <AddCommentElement
              key={reply.id}
              value={editInitialText}
              onChange={(e) => setEditInitialText(e.target.value)}
              onClick={() =>
                editComment(
                  reply,
                  editInitialText,
                  setEditInitialText,
                  setIsEditing
                )
              }
              isEditing={isEditing}
              currentUser={currentUser}
            />
          ) : (
            <div className="replies-wrapper" key={reply.id}>
              <div className="replies">
                <UserInfo user={reply} />
                <Typography
                  replayed={reply.replyingTo}
                  text={reply.content}
                  variant="body"
                  spanColor="purple"
                />
                <ButtonsWrapper
                  user={reply}
                  handleEdit={() => handleEdit(reply.id, reply.content)}
                  handleDeleteComment={handleDeleteComment}
                  handleScoreChange={handleScoreChange}
                  startReplying={() => startNestedReply(reply)}
                />
              </div>
            </div>
          )
        )}
        {user.replies.map((reply) =>
          reply.id === replyingToReply ? (
            <AddCommentElement
              key={reply.id}
              onClick={(commentText) =>
                addReply(reply, commentText, () => setReplyingToReply(false))
              }
              isEditing={isEditing}
              currentUser={currentUser}
            />
          ) : null
        )}
      </>
    );
  }
);

export default Replies;
