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
  commentsData,
  setCommentsData,
  replyingTo,
  setReplyingTo,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState(null);

  const openDeleteModal = (id) => {
    setIsModalVisible(true);
    setId(id);
    console.log(id);
  };

  return (
    <>
      {isModalVisible && (
        <DeleteModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          id={id}
          setId={setId}
          user={user}
        />
      )}
      <div className="buttons-wrapper">
        <LikesMolecula
          user={user}
          commentsData={commentsData}
          setCommentsData={setCommentsData}
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
              onClick={() => openDeleteModal(user.id)}
            />
          </div>
        )}
      </div>
    </>
  );
}
