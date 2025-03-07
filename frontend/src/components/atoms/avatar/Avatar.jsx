import "./avatar.css";

export default function Avatar({ imgSrc, imgAlt, className }) {
  return <img className={className} src={imgSrc} alt={imgAlt} />;
}
