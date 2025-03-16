import "./modal.css";

import { JSX, useState } from "react";

import Button from "@atoms/button/Button";
import classNames from "@utils/classNames";

type Props = {
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void | Promise<void>;
  onConfirm: () => void | Promise<void>;
  children: JSX.Element;
};

export const Modal = ({
  onCancel,
  onConfirm,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: Props) => {
  const [loading, setLoading] = useState(false);

  const className = classNames("modal", {});

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm?.();
    setLoading(false);
  };

  return (
    <dialog className="modal-element">
      <div className={className}>
        {children}
        <div className="delet-modal-btns-wrapper">
          <Button color="blue" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button color="red" onClick={handleConfirm} loading={loading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </dialog>
  );
};
