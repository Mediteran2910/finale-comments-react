import "./buttonWrapper.css";

import { useState } from "react";

import Button from "@atoms/button/Button";
import Typography from "@atoms/typgoraphy/typography";
import LikesMolecula from "@molecules/likesMolecula/LikesMolecula";
import { Modal } from "@molecules/modal/Modal";
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

  const onDeleteComment = () => handleDeleteComment(comment.id);
  const onKeepComment = () => setIsModalVisible(false);

  /** @todo move to the context or portal **/
  if (isModalVisible) {
    return (
      <Modal
        confirmText="Delete"
        cancelText="Keep"
        onConfirm={onDeleteComment}
        onCancel={onKeepComment}
      >
        <Typography variant="body">
          Are you sure you want to delete your comment, once you do that, there
          is no going back!
        </Typography>
      </Modal>
    );
  }

  return (
    <div className="buttons-wrapper">
      <LikesMolecula
        liked={comment.isLiked}
        likes={comment.score}
        onChange={handleScoreChange}
      />
      {comment.isYou ? (
        <div className="edit-delete-btns-wrap">
          <Button icon="edit" onClick={onTriggerEdit} />
          <Button icon="delete" onClick={() => setIsModalVisible(true)} />
        </div>
      ) : (
        <Button onClick={onTriggerReply} prefixIcon="reply">
          Reply
        </Button>
      )}
    </div>
  );
}
