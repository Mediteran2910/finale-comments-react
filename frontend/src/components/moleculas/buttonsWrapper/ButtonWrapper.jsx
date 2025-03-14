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

  const handleKeepComment = () => {
    setIsModalVisible(false);
  };

  if (isModalVisible) {
    return (
      <Modal
        user={user}
        handleDeleteComment={() => handleDeleteComment(user, user.id)}
        handleKeepComment={handleKeepComment}
        deleteModal={true}
        modalText=" Are you sure you want to delete your comment, once you do that,
        there is no going back!"
      />
    );
  }

  if (nestedReply && !user.isYou) {
    return <LikesMolecula user={user} handleScoreChange={handleScoreChange} />;
  }

  if (user.isYou) {
    return (
      <div className="buttons-wrapper">
        <LikesMolecula user={user} handleScoreChange={handleScoreChange} />
        <div className="edit-delete-btns-wrap">
          <Button icon="edit" onClick={handleEdit} />
          <Button icon="delete" onClick={() => setIsModalVisible(true)} />
        </div>
      </div>
    );
  }

  if (!user.isYou) {
    return (
      <div className="buttons-wrapper">
        <LikesMolecula user={user} handleScoreChange={handleScoreChange} />
        <Button onClick={startReplying} prefixIcon="reply">
          Reply
        </Button>
      </div>
    );
  }
}
