export default function PersonalButton({ src, onClick, alt }) {
  return (
    <button onClick={onClick}>
      <img src={src} alt={alt} />
    </button>
  );
}
