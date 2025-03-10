import "./button.css";

const icons = {
  deleteIcon: {
    src: "./icons/icon-delete.svg",
    alt: "red trash can icon, icon for deleting personal comments or replies",
  },
  editIcon: {
    src: "./icons/icon-edit.svg",
    alt: "blue pen icon, icon for editing comments or replies",
  },
  replyIcon: {
    src: "./icons/icon-reply.svg",
    alt: "blue left arrow icon for replying to the comment or reply",
  },
};

export default function Button({
  onClick,
  disabled,
  children,
  colored,
  outline,
  prefixIcon,
  icon,
  style,
}) {
  const classes = [];

  if (outline) classes.push("outline");
  if (colored) classes.push(`colored-${colored}`);
  if (prefixIcon) classes.push("prefixIcon");
  if (icon) classes.push("icon");

  let className = classes.map((c) => `btn btn-${c}`).join(" ");

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
    >
      {prefixIcon && (
        <img src={icons[prefixIcon].src} alt={icons[prefixIcon].alt}></img>
      )}
      {icon && <img src={icons[icon].src} alt={icons[icon].alt}></img>}
      {children}
    </button>
  );
}
