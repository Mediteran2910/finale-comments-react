import React from "react";
import LikesMolecula from "../likesMolecula/LikesMolecula";
import "./buttonWrapper.css";
import Button from "../../atoms/button/Button";
import { Modal } from "../../../modal/Modal";
import { useState } from "react";

export default function ButtonsWrapper({
  user,
  handleEdit,
  nestedReply,
  handleDeleteComment,
  handleScoreChange,
  startReplying,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLiked = async (value: boolean) => {
    setIsLoading(true);
    await handleScoreChange(value);
    setIsLoading(false);
  };

  const handleKeepComment = () => {
    setIsModalVisible(false);
  };

  if (isModalVisible) {
    return (
      <Modal
        handleDeleteComment={() => handleDeleteComment(user, user.id)}
        handleKeepComment={handleKeepComment}
        deleteModal={true}
      />
    );
  }

  if (nestedReply && !user.isYou) {
    return (
      <LikesMolecula
        liked={user.isLiked}
        likes={user.score}
        loading={isLoading}
        onChange={handleLiked}
      />
    );
  }

  if (user.isYou) {
    return (
      <div className="buttons-wrapper">
        <LikesMolecula
          liked={user.isLiked}
          likes={user.score}
          loading={isLoading}
          onChange={handleLiked}
        />
        <div className="edit-delete-btns-wrap">
          <Button icon="edit" onClick={handleEdit} />
          <Button icon="delete" onClick={() => setIsModalVisible(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="buttons-wrapper">
      <LikesMolecula
        liked={user.isLiked}
        likes={user.score}
        loading={isLoading}
        onChange={handleLiked}
      />
      <Button onClick={startReplying} prefixIcon="reply">
        Reply
      </Button>
    </div>
  );
}
