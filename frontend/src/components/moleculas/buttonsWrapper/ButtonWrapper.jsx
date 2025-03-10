import LikesMolecula from "../likesMolecula/LikesMolecula";
import "./buttonWrapper.css";
import Button from "../../atoms/button/Button";
import { Modal } from "../../../modal/Modal";
import { useState } from "react";
import { useRef } from "react";

export default function ButtonsWrapper({
  user,
  startReplying,
  handleEdit,
  handleDeleteComment,
  handleScoreChange,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleKeepComment = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible ? (
        <Modal
          user={user}
          handleDeleteComment={() => handleDeleteComment(user, user.id)}
          handleKeepComment={handleKeepComment}
          deleteModal={true}
          modalText=" Are you sure you want to delete your comment, once you do that,
            there is no going back!"
        />
      ) : (
        <div className="buttons-wrapper">
          <LikesMolecula user={user} handleScoreChange={handleScoreChange} />
          {!user.isYou ? (
            <Button onClick={startReplying} prefixIcon="replyIcon">
              Reply
            </Button>
          ) : (
            <div className="edit-delete-btns-wrap">
              <Button icon="editIcon" onClick={handleEdit} />
              <Button
                icon="deleteIcon"
                onClick={() => setIsModalVisible(true)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
