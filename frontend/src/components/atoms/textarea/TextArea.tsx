import React from "react";

type Props = React.JSX.IntrinsicElements["textarea"];

export default function TextArea(props: Props) {
  return <textarea {...props}></textarea>;
}
