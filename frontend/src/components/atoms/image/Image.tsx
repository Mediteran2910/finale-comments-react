import React from "react";
import "./image.css";

const base = "img";

type Props = { avatar?: boolean } & React.JSX.IntrinsicElements["img"];

export default function Image({
  avatar,
  className: _className,
  ...rest
}: Props) {
  const classes: Array<string> = [];

  if (avatar) classes.push("avatar");

  const classNames = [
    base,
    ...classes.map((c) => `${base}-${c}`),
    _className,
  ].join(" ");

  return <img className={classNames} {...rest} />;
}
