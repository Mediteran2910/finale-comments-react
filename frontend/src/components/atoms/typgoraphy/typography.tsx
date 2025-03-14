import React from "react";
import "./typography.css";

const base = "txt";

type Props = {
  bold?: boolean;
  children: string;
  color?: string;
  variant: "body" | "caption" | "overline";
} & React.JSX.IntrinsicElements["span"];

export default function Typography({
  variant,
  bold,
  color,
  children,
  className: _className,
  ...rest
}: Props) {
  const classes: Array<string> = [];

  if (_className) classes.push(_className);
  if (color) classes.push(`color-${color}`);
  if (variant) classes.push(variant);
  if (bold) classes.push("bold");

  const className = [base, ...classes.map((c) => `${base}-${c}`)].join(" ");

  return (
    <span {...rest} className={className}>
      {children}
    </span>
  );
}
