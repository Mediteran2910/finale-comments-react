import "./typography.css";

export default function Typography({
  variant,
  bold,
  color,
  text,
  children,
  replayed,
  spanColor,
}) {
  const classes = [];

  //   if (body)
  //   if (caption)
  //   if (overline)
  //   if (bold)

  const coloredClass = color ? `txt-color-${color}` : "";
  const baseClass = "txt";
  const variantClass = `txt-${variant}`;
  const boldClass = bold ? "txt-bold" : "";

  const classNames = [baseClass, variantClass, boldClass, coloredClass]
    .filter(Boolean)
    .join(" ");

  return (
    <p className={classNames}>
      {replayed ? (
        <span className={classNames} style={{ color: spanColor }}>
          @{replayed}{" "}
        </span>
      ) : (
        ""
      )}
      {text}
      {children}
    </p>
  );
}
