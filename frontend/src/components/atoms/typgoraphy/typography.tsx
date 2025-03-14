import React from "react";
import "./typography.css";
import classNames from "../../../utils/classNames";

type Props = {
  bold?: boolean;
  badge?: boolean;
  children?: string | Array<string>;
  color?: "blue";
  variant: "body" | "caption" | "overline";
} & React.JSX.IntrinsicElements["span"];

export default function Typography({
  variant,
  bold,
  color,
  children,
  className: _className,
  badge,
  ...rest
}: Props) {
  const className = classNames(
    "txt",
    {
      [`color-${color}`]: color,
      badge,
      variant,
      bold,
    },
    _className,
  );

  return (
    <span {...rest} className={className}>
      {children}
    </span>
  );
}
