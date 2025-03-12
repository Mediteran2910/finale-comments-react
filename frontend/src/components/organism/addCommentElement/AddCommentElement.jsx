import Image from "../../atoms/image/Image";
import TextArea from "../../atoms/textarea/TextArea";

import "./addCommentElement.css";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import LoadingModal from "../../../modal/LoadingModal";
import Button from "../../atoms/button/Button";

export default function AddCommentElement({
  onClick,
  replyingTo,
  isEditing,
  currentUser,
  value,
  replyingToComment,
  replyingToReply,
}) {
  // value ? "" : value;
  const [commentText, setCommentText] = useState(value ?? ""); //nulish Nullish coalescing operator (??)

  const [isLoadingNewComm, setIsLoadingNewComm] = useState(false);

  const handleLoadingComment = async () => {
    setIsLoadingNewComm(true);
    await onClick(commentText, setCommentText);
    setIsLoadingNewComm(false);
  };

  console.log(commentText);

  return (
    <div className="add-comment-wrapper">
      <div className="add-comment-element">
        <Image imgSrc={currentUser.image.png} avatar={true} />
        <TextArea
          value={commentText} //moran imat value radi editinga, da mi pokaze stari tekst komentara, alternativa je mozda useEffect
          placeholder={replyingTo ? "Add an reply..." : "Add a comment..."}
          onChange={(e) => setCommentText(e.target.value)}
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
