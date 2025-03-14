import React from "react";

import "./modal.css";
import Button from "../components/atoms/button/Button";
import BeatLoader from "react-spinners/BeatLoader";
import Typography from "../components/atoms/typgoraphy/typography";
import { useState } from "react";
import classNames from "../utils/classNames";

type Props = {
  handleKeepComment?: () => void | Promise<void>;
  /** @deprecated @todo add loading as prop **/
  handleDeleteComment?: () => void | Promise<void>;
  loadingModal?: boolean;
  deleteModal?: boolean;
};

export const Modal = ({
  handleKeepComment,
  handleDeleteComment,
  loadingModal,
  deleteModal,
}: Props) => {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const className = classNames("modal", {
    loading: loadingModal,
    delete: deleteModal,
  });

  const handleLoadingAndDelete = async () => {
    setIsLoadingDelete(true);
    await handleDeleteComment?.();
    setIsLoadingDelete(false);
  };

  if (deleteModal) {
    return (
      <dialog className="modal-element">
        <div className={className}>
          <Typography variant="body">
            Are you sure you want to delete your comment, once you do that,
            there is no going back!
          </Typography>
          <div className="delet-modal-btns-wrapper">
            <Button color="blue" onClick={handleKeepComment}>
              Keep
            </Button>
            <Button
              color="red"
              onClick={handleLoadingAndDelete}
              loading={isLoadingDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </dialog>
    );
  }

  if (loadingModal) {
    return (
      <dialog className="modal-element">
        <div className={className}>
          <Typography variant="body">Loading data, please wait...</Typography>
          <BeatLoader />
        </div>
      </dialog>
    );
  }

  return null;
};
