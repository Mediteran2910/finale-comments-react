import LikesMolecula from "@molecules/likesMolecula/LikesMolecula";
import "./buttonWrapper.css";
import Button from "@atoms/button/Button";
import { Modal } from "@molecules/modal/Modal";
import { useState } from "react";
import { Comment } from "@types";

type Props = {
  comment: Comment;
  handleDeleteComment: (id: string) => Promise<void>;
  handleScoreChange: (i: boolean | null) => Promise<void>;
  onTriggerEdit: () => void;
  onTriggerReply: () => void;
};

export default function ButtonsWrapper({
  comment,
  handleDeleteComment,
  handleScoreChange,
  onTriggerEdit,
  onTriggerReply,
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setDeleteIsLoading] = useState(false);

  const handleLiked = async (value: boolean) => {
    setIsLoading(true);
    await handleScoreChange(value);
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

  /** @todo move to the context or portal **/
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

  return (
    <div className="buttons-wrapper">
      <LikesMolecula
        liked={comment.isLiked}
        likes={comment.score}
        loading={isLoading}
        onChange={handleLiked}
      />
      {comment.isYou ? (
        <div className="edit-delete-btns-wrap">
          <Button icon="edit" onClick={onTriggerEdit} />
          <Button icon="delete" onClick={() => setIsModalVisible(true)} />
        </div>
      ) : (
        <Button loading={isLoading} onClick={onTriggerReply} prefixIcon="reply">
          Reply
        </Button>
      )}
    </div>
  );
}
