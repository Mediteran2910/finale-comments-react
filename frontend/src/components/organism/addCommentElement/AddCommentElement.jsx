import Avatar from "../../atoms/avatar/Avatar";
import TextArea from "../../atoms/textarea/TextArea";
import SubmitButton from "../../atoms/submitButton/SubmitButton";
import "./addCommentElement.css";

export default function AddCommentElement({
  onClick,
  value,
  onChange,
  replyingTo,
  isEditing,
  currentUser,
}) {
  return (
    <div className="add-comment-wrapper">
      <div className="add-comment-element">
        <Avatar imgSrc={currentUser.image.png} />
        <TextArea
          placeholder={
            replyingTo !== null ? "Add an reply..." : "Add a comment..."
          }
          value={value}
          onChange={onChange}
        />
        <SubmitButton
          onClick={onClick}
          text={isEditing ? "EDIT" : replyingTo !== null ? "REPLY" : "SEND"}
        />
      </div>
    </div>
  );
}
