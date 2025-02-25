import React, { useState } from "react";
import "./deleteModal.css";
import { deleteData } from "../services/deleteData";
import { useComments } from "../hooks/useComments";
import { requestObjects, requestUrls } from "../services/requestObjects";
import { deleteComment } from "../utils/deleteData";
import { useAPI } from "../hooks/useAPI";

export const DeleteModal = ({
  isModalVisible,
  setIsModalVisible,
  id,
  setId,
  user,
  setCommentsData,
}) => {
  const { isLoading, isError, makeApiRequest } = useAPI();

  const handleDeleteComment = async () => {
    const url = requestUrls(user).deleteUrl;

    const response = await makeApiRequest(url, requestObjects.deleteRequest);
    if (response) {
      deleteComment(setCommentsData, setIsModalVisible, setId, id);
    } else {
      console.error("Failed to delete");
    }
  };

  const handleKeepComment = () => {
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
          <button onClick={handleKeepComment} className="keep-comment-btn">
            Keep
          </button>
          <button onClick={handleDeleteComment} className="delete-comment-btn">
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
