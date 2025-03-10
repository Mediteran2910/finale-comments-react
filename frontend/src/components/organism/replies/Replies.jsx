import UserInfo from "../../moleculas/userInfo/UserInfo";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import "./replies.css";
import React from "react";
import Typography from "../../atoms/typgoraphy/typography";

const Replies = React.memo(
  ({
    user,
    handleEdit,
    editComment,
    editInitialText,
    setEditInitialText,
    isEditing,
    handleDeleteComment,
    currentUser,
    handleScoreChange,
  }) => {
    return (
      <>
        {user.replies?.map((reply) =>
          isEditing === reply.id ? (
            <AddCommentElement
              key={reply.id}
              value={editInitialText}
              onChange={(e) => setEditInitialText(e.target.value)}
              onClick={() => editComment(reply)}
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
                />
              </div>
            </div>
          )
        )}
      </>
    );
  }
);

export default Replies;
