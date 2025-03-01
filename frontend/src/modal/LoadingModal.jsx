import { useContext } from "react";
const loading = false;

export default function LoadingModal() {
  return (
    <dialog open={loading} className="delete-modal">
      <div className="modal-content">
        <p>Please wait, we are loading Data....</p>
      </div>
    </dialog>
  );
}
