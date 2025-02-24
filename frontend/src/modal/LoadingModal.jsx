import { useContext } from "react";
import { useComments } from "../hooks/useComments";

export default function LoadingModal() {
  const { loading } = useComments();

  return (
    <dialog open={loading} className="delete-modal">
      <div className="modal-content">
        <p>Please wait, we are loading Data....</p>
      </div>
    </dialog>
  );
}
