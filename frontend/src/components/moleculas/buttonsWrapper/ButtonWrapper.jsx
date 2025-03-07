import LikesMolecula from "../likesMolecula/LikesMolecula";
import "./buttonWrapper.css";
import { useState } from "react";

import Button from "../../atoms/button/Button";
import { Modal } from "../../../modal/Modal";

export default function ButtonsWrapper({
  user,
  startReplying,
  handleEdit,
  handleDeleteComment,
  handleScoreChange,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {isModalVisible && (
        <Modal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          user={user}
          handleDeleteComment={() => handleDeleteComment(user, user.id)}
          handleKeepComment={() => setIsModalVisible(false)}
          isDeleteModal={true}
          modalText=" Are you sure you want to delete your comment, once you do that,
            there is no going back!"
        />
      )}
      <div className="buttons-wrapper">
        <LikesMolecula user={user} handleScoreChange={handleScoreChange} />
        {!user.isYou ? (
          <Button
            imgSrc="./icons/icon-reply.svg"
            imgAlt="left arrow icon representing reply icon"
            text="Reply"
            onClick={startReplying}
            isActionBtn={true}
            className="reply-button"
          />
        ) : (
          <div className="edit-delete-btns-wrap">
            <Button
              imgSrc="./icons/icon-edit.svg"
              imgAlt="edit icon"
              isActionBtn={true}
              onClick={handleEdit}
              className="edit-delete-btn"
            />
            <Button
              imgSrc="./icons/icon-delete.svg"
              imgAlt="delete icon"
              isActionBtn={true}
              onClick={() => setIsModalVisible(true)}
              className="edit-delete-btn"
            />
          </div>
        )}
      </div>
    </>
  );
}
