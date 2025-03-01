export default function LikeButton({ sign, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {sign}
    </button>
  );
}
