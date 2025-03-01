import "./deleteModal.css";

export const DeleteModal = ({ setIsModalVisible, handleDeleteComment }) => {
  const handleKeepComment = () => {
    setIsModalVisible(false);
  };

  return (
    <dialog className="delete-modal">
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
