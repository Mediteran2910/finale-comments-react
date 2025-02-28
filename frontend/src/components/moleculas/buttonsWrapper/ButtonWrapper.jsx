import LikesMolecula from "../likesMolecula/LikesMolecula";
import ReplyButton from "../../atoms/replyButton/ReplyButton";
import PersonalButton from "../../atoms/personalButton/PersonalButton";
import "./buttonWrapper.css";
import { useState } from "react";
import { DeleteModal } from "../../../modal/deleteModal";

export default function ButtonsWrapper({
  user,
  startReplying,
  handleEdit,
  incrementScore,
  decrementScore,
  handleDeleteComment,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {isModalVisible && (
        <DeleteModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          user={user}
          handleDeleteComment={() => handleDeleteComment(user, user.id)}
        />
      )}
      <div className="buttons-wrapper">
        <LikesMolecula
          user={user}
          incrementScore={incrementScore}
          decrementScore={decrementScore}
        />
        {!user.isYou ? (
          <ReplyButton
            src="./icons/icon-reply.svg"
            btnText="Reply"
            onClick={startReplying}
          />
        ) : (
          <div className="personal-buttons-wrap">
            <PersonalButton
              src="./icons/icon-edit.svg"
              alt="edit icon"
              onClick={handleEdit}
            />
            <PersonalButton
              src="./icons/icon-delete.svg"
              alt="delete icon"
              onClick={() => setIsModalVisible(true)}
            />
          </div>
        )}
      </div>
    </>
  );
}
