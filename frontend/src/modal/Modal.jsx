import "./modal.css";
import Button from "../components/atoms/button/Button";
import BeatLoader from "react-spinners/BeatLoader";
import Typography from "../components/atoms/typgoraphy/typography";
import { useState } from "react";

export const Modal = ({
  handleKeepComment,
  handleDeleteComment,
  loadingModal,
  deleteModal,
}) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const classes = [];

  if (loadingModal) classes.push("loading");
  if (deleteModal) classes.push("delete");

  const classNames = classes.map((c) => `modal-${c}`);

  const handleLoadingAndDelete = async () => {
    setIsLoadingDelete(true);
    await handleDeleteComment();
    setIsLoadingDelete(false);
  };

  if (deleteModal) {
    return (
      <dialog className="modal-element">
        <div className={classNames}>
          <Typography
            variant="body"
            text="Are you sure you want to delete your comment, once you do that,
            there is no going back!"
          />
          <div className="delet-modal-btns-wrapper">
            <Button
              colored="blue"
              onClick={() => {
                handleKeepComment();
              }}
            >
              Keep
            </Button>
            <Button
              colored="red"
              onClick={handleLoadingAndDelete}
              style={{ backgroundColor: "red", color: "white" }}
            >
              {isLoadingDelete ? (
                <BeatLoader color="white" size={8} />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </dialog>
    );
  }

  if (loadingModal) {
    return (
      <dialog className="modal-element">
        <div className={classNames}>
          <Typography variant="body" text="Loading data, please wait..." />
          <BeatLoader />
        </div>
      </dialog>
    );
  }

  return null;
};
