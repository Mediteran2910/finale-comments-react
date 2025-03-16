import "./modal.css";
import Button from "@atoms/button/Button";
import BeatLoader from "react-spinners/BeatLoader";
import Typography from "@atoms/typgoraphy/typography";
import classNames from "@utils/classNames";

type Props = {
  handleKeepComment?: () => void | Promise<void>;
  handleDeleteComment?: () => void;
  loadingModal?: boolean;
  deleteModal?: boolean;
  loading?: boolean;
};

export const Modal = ({
  handleKeepComment,
  handleDeleteComment,
  loadingModal,
  deleteModal,
  loading,
}: Props) => {
  const className = classNames("modal", {
    loading: loadingModal,
    delete: deleteModal,
  });

  const handleLoadingAndDelete = () => {
    handleDeleteComment?.();
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
              loading={loading}
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
