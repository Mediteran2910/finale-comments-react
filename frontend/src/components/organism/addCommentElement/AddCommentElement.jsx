import Avatar from "../../atoms/avatar/Avatar";
import TextArea from "../../atoms/textarea/TextArea";
import SubmitButton from "../../atoms/submitButton/SubmitButton";
import { useContext, useState } from "react";
import { CommentsContext } from "../../../context/CommentsContext";
import { ReplyingToContext } from "../../../context/ReplyingContext";
import "./addCommentElement.css";

export default function AddCommentElement({ onClick, value, onChange }) {
  const { commentsData } = useContext(CommentsContext);
  const { replyingTo } = useContext(ReplyingToContext);

  if (!commentsData || !commentsData.currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="add-comment-wrapper">
      <div className="add-comment-element">
        <Avatar imgSrc={commentsData.currentUser.image.png} />
        <TextArea
          placeholder={
            replyingTo !== null ? "Add an reply..." : "Add a comment..."
          }
          value={value}
          onChange={onChange}
        />
        <SubmitButton submitButtonText="SEND" onClick={onClick} />
      </div>
    </div>
  );
}
