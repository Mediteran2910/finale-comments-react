import Image from "../../atoms/image/Image";
import TextArea from "../../atoms/textarea/TextArea";

import "./addCommentElement.css";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import LoadingModal from "../../../modal/LoadingModal";
import Button from "../../atoms/button/Button";

export default function AddCommentElement({
  onClick,
  replyingTo,
  isEditing,
  currentUser,
  value,
  onChange,
  replyingToComment,
  replyingToReply,
}) {
  const [commentText, setCommentText] = useState("");
  const [isLoadingNewComm, setIsLoadingNewComm] = useState(false);

  const handleLoadingComment = async () => {
    setIsLoadingNewComm(true);
    await onClick(commentText, setCommentText);

    setIsLoadingNewComm(false);
  };

  return (
    <div className="add-comment-wrapper">
      <div className="add-comment-element">
        <Image imgSrc={currentUser.image.png} avatar={true} />
        <TextArea
          value={isEditing ? value : commentText} //moran imat value radi editinga, da mi pokaze stari tekst komentara, alternativa je mozda useEffect
          placeholder={
            replyingToComment || replyingToReply
              ? "Add an reply..."
              : "Add a comment..."
          }
          onChange={
            isEditing ? onChange : (e) => setCommentText(e.target.value)
          }
        />
        <Button
          onClick={() => handleLoadingComment()}
          disabled={
            isLoadingNewComm || (commentText.trim() === "" && !isEditing)
          }
          colored="blue"
          loading={isLoadingNewComm}
        >
          {isLoadingNewComm ? (
            <BeatLoader loading={true} size={8} color="white" />
          ) : isEditing ? (
            "EDIT"
          ) : replyingToComment || replyingToReply ? (
            "REPLY"
          ) : (
            "SEND"
          )}
        </Button>
      </div>
    </div>
  );
}
