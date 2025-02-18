import React, { useContext, useState } from "react";
import "./deleteModal.css";
import { deleteData } from "../services/deleteData";
import { CommentsContext } from "../context/CommentsContext";

export const DeleteModal = ({
  isModalVisible,
  setIsModalVisible,
  id,
  setId,
  user,
}) => {
  const { setCommentsData } = useContext(CommentsContext);

  const deleteComment = async () => {
    const urlDeleteComment = `http://localhost:8000/comment/delete/${user.id}`;

    const response = await deleteData(urlDeleteComment);
    if (response) {
      setCommentsData((prevData) => ({
        ...prevData,
        otherUsers: prevData.otherUsers
          .map((comment) => {
            if (comment.id === id) {
              return null;
            } else {
              return {
                ...comment,
                replies: comment.replies.filter((reply) => reply.id !== id),
              };
            }
          })
          .filter(Boolean),
      }));
      setIsModalVisible(false);
      setId(null);
    } else {
      console.error("Failed to delete comment on the backend");
    }
  };

  const keepComment = () => {
    setIsModalVisible(false);
    setId(null);
    console.log(id);
  };

  return (
    <dialog open={isModalVisible} className="delete-modal">
      <div className="modal-content">
        <p>
          Are you sure you want to delete your comment, once you do that, there
          is no going back!
        </p>
        <div className="btns-wrapper">
          <button onClick={keepComment} className="keep-comment-btn">
            Keep
          </button>
          <button onClick={deleteComment} className="delete-comment-btn">
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
