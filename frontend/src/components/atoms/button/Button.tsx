import React from "react";
import "./button.css";
import { BeatLoader } from "react-spinners";
import classNames from "../../../utils/classNames";

const icons = {
  delete: {
    src: "./icons/icon-delete.svg",
    alt: "red trash can icon, icon for deleting personal comments or replies",
  },
  edit: {
    src: "./icons/icon-edit.svg",
    alt: "blue pen icon, icon for editing comments or replies",
  },
  reply: {
    src: "./icons/icon-reply.svg",
    alt: "blue left arrow icon for replying to the comment or reply",
  },
};

type Props = {
  color?: string;
  icon?: keyof typeof icons;
  outline?: boolean;
  prefixIcon?: keyof typeof icons;
  loading?: boolean;
} & React.JSX.IntrinsicElements["button"];

export default function Button({
  children,
  className: _className,
  color,
  icon,
  outline,
  prefixIcon,
  loading,
  ...rest
}: Props) {
  const className = classNames(
    "btn",
    {
      outline: outline,
      [`colored-${color}`]: color,
      prefixIcon,
      icon,
    },
    _className,
  );

  const ico = icon && icons[icon];
  const prefixIco = prefixIcon && icons[prefixIcon];

  /** @todo move to css **/
  return (
    <button {...rest} className={className} style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="btn-loader-wrapper"
      >
        <BeatLoader loading={loading ?? false} size={5} color="white" />
      </div>
      <div style={{ visibility: loading ? "hidden" : undefined }}>
        {prefixIco && <img src={prefixIco.src} alt={prefixIco.alt}></img>}
        {ico && <img src={ico.src} alt={ico.alt}></img>}
        {children}
      </div>
    </button>
  );
}
