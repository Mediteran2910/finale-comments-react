import "./modal.css";
import Button from "../components/atoms/button/Button";
import BeatLoader from "react-spinners/BeatLoader";

export const Modal = ({
  handleDeleteComment,
  handleKeepComment,
  isDeleteModal,
  isLoadingModal,
  modalText,
}) => {
  if (isDeleteModal) {
    return (
      <dialog className="delete-modal">
        <div className="modal-content">
          <p style={{ width: "90%" }}> {modalText}</p>
          <div className="delet-modal-btns-wrapper">
            <Button
              className="keep-comment-btn"
              onClick={handleKeepComment}
              text="Keep"
              deleteModalBtn={true}
            ></Button>
            <Button
              className="delete-comment-btn"
              onClick={handleDeleteComment}
              text={handleDeleteComment ? "" : "Delete"}
              deleteModalBtn={true}
            >
              <BeatLoader color="white" size={8} />
            </Button>
          </div>
        </div>
      </dialog>
    );
  }

  if (isLoadingModal) {
    return (
      <dialog className="delete-modal">
        <div className="modal-content">
          <p style={{ textAlign: "center" }}>{modalText}</p>
          <BeatLoader />
        </div>
      </dialog>
    );
  }
};
