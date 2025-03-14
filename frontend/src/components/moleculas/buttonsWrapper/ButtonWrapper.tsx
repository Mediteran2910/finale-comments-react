import React from "react";
import LikesMolecula from "../likesMolecula/LikesMolecula";
import "./buttonWrapper.css";
import Button from "../../atoms/button/Button";
import { Modal } from "../../../modal/Modal";
import { useState } from "react";
import { Comment } from "../../../types";

type Props = {
  comment: Comment;
  handleDeleteComment: (id: string) => Promise<void>;
  handleScoreChange: (c: Comment, i: boolean | null) => Promise<void>;
  onTriggerEdit: () => void;
  startReplying: () => void;
};

export default function ButtonsWrapper({
  comment,
  handleDeleteComment,
  handleScoreChange,
  onTriggerEdit,
  startReplying,
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setDeleteIsLoading] = useState(false);

  const handleLiked = async (value: boolean) => {
    setIsLoading(true);
    await handleScoreChange(comment, value);
    setIsLoading(false);
  };

  const onDeleteComment = async () => {
    setDeleteIsLoading(true);
    await handleDeleteComment(comment.id);
    setDeleteIsLoading(false);
  };

  const handleKeepComment = () => {
    setIsModalVisible(false);
  };

  if (isModalVisible) {
    return (
      <Modal
        handleDeleteComment={onDeleteComment}
        handleKeepComment={handleKeepComment}
        deleteModal={true}
        loading={isDeleteLoading}
      />
    );
  }

  if (comment.isYou) {
    return (
      <div className="buttons-wrapper">
        <LikesMolecula
          liked={comment.isLiked}
          likes={comment.score}
          loading={isLoading}
          onChange={handleLiked}
        />
        <div className="edit-delete-btns-wrap">
          <Button icon="edit" onClick={onTriggerEdit} />
          <Button icon="delete" onClick={() => setIsModalVisible(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="buttons-wrapper">
      <LikesMolecula
        liked={comment.isLiked}
        likes={comment.score}
        loading={isLoading}
        onChange={handleLiked}
      />
      <Button onClick={startReplying} prefixIcon="reply">
        Reply
      </Button>
    </div>
  );
}
