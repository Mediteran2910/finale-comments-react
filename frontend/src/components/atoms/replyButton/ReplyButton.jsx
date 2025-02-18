export default function ReplyButton({ btnText, src, onClick }) {
  return (
    <button onClick={onClick} className="reply-button">
      <img src={src} alt="" /> {btnText}
    </button>
  );
}
