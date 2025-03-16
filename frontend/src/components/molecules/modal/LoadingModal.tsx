import { JSX } from "react";

type Props = {
  className: string;
  message: string;
  children: JSX.Element;
};

export default function LoadingModal({ className, message, children }: Props) {
  return (
    <div className={className}>
      <dialog open={true}>
        <div>
          <p>{message}</p>
          {children}
        </div>
      </dialog>
    </div>
  );
}
