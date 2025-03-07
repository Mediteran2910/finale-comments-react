export default function LoadingModal({ className, message, children }) {
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
