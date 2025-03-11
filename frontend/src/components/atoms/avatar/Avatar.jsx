import "./avatar.css";

export default function Avatar({ imgSrc, imgAlt, avatar }) {
  const classes = [];

  if (avatar) classes.push("avatar");

  const classNames = classes.map((c) => `img-${c}`).join(" ");

  return <img className={classNames} src={imgSrc} alt={imgAlt} />;
}
