import Avatar from "../../atoms/avatar/Avatar";
import TextArea from "../../atoms/textarea/TextArea";
import SubmitButton from "../../atoms/submitButton/SubmitButton";
import { useContext, useState } from "react";

import { useComments } from "../../../hooks/useComments";
import "./addCommentElement.css";

export default function AddCommentElement({
  onClick,
  value,
  onChange,
  commentsData,
  setCommentsData,
  replyingTo,
  setReplyingTo,
}) {
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
        <SubmitButton
          submitButtonText={replyingTo !== null ? "REPLY" : "SEND"}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
