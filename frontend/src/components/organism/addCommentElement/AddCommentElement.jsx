import Avatar from "../../atoms/avatar/Avatar";
import TextArea from "../../atoms/textarea/TextArea";
import SubmitButton from "../../atoms/submitButton/SubmitButton";
import "./addCommentElement.css";
import { useState } from "react";

export default function AddCommentElement({
  onClick,
  replyingTo,
  isEditing,
  currentUser,
}) {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="add-comment-wrapper">
      <div className="add-comment-element">
        <Avatar imgSrc={currentUser.image.png} />
        <TextArea
          placeholder={
            replyingTo !== null ? "Add an reply..." : "Add a comment..."
          }
          onChange={(e) => setCommentText(e.target.value)}
        />
        <SubmitButton
          onClick={() => onClick(commentText)}
          text={isEditing ? "EDIT" : replyingTo !== null ? "REPLY" : "SEND"}
        />
      </div>
    </div>
  );
}
