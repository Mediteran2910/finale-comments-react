import "./button.css";

export default function Button({
  className,
  sign,
  onClick,
  disabled,
  text,
  isLikeBtn,
  imgSrc,
  imgAlt,
  isActionBtn,
  isClickable,
  children,
  deleteModalBtn,
}) {
  if (isLikeBtn) {
    return (
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
        style={
          disabled
            ? {
                color: "rgb(255, 255, 255)",
                backgroundColor: "#5357b6",
              }
            : {}
        }
      >
        {sign}
      </button>
    );
  }

  if (isActionBtn) {
    return (
      <button
        onClick={onClick}
        className={className}
        style={isClickable === false ? { backgroundColor: "#7e81d4" } : {}}
        disabled={disabled}
      >
        {imgSrc && <img src={imgSrc} alt={imgAlt} />}
        {text}
        {children}
      </button>
    );
  }

  if (deleteModalBtn) {
    return (
      <button onClick={onClick} className={className} disabled={disabled}>
        {text}
        {children}
      </button>
    );
  }
}
