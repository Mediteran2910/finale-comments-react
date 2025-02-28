export default function Avatar({ imgSrc, imgAlt }) {
  return (
    <div>
      <img className="avatar" src={imgSrc} alt={imgAlt} />
    </div>
  );
}
