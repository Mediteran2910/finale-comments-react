import { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";

export default function LoadingModal() {
  const { loading } = useContext(CommentsContext);

  return (
    <dialog open={loading} className="delete-modal">
      <div className="modal-content">
        <p>Please wait, we are loading Data....</p>
      </div>
    </dialog>
  );
}
