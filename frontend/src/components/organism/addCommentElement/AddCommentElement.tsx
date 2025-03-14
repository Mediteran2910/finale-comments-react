import React from "react";
import Image from "../../atoms/image/Image";
import TextArea from "../../atoms/textarea/TextArea";

import "./addCommentElement.css";
import { useState } from "react";
import Button from "../../atoms/button/Button";

type Props = {
  avatar?: string;
  onSubmit: (text: string) => Promise<void>;
  isReply?: boolean;
  comment?: string;
};

export default function AddCommentElement({
  onSubmit,
  avatar,
  comment = "",
  isReply,
}: Props) {
  const [text, setText] = useState(comment);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(text)
      .then(() => setEditing(false))
      .finally(() => setLoading(false));
  };

  const buttonText = editing ? "EDIT" : isReply ? "REPLY" : "SEND";
  const disabled = loading || (editing && text.trim() === "");

  //if (!editing) {
  //return (
  //  <div className="add-comment-wrapper">
  //    <div className="add-comment-element">
  //      <Image src={avatar} avatar />
  //      <Button onClick={() => setEditing(true)} color="blue">
  //        EDIT
  //      </Button>
  //    </div>
  //  </div>
  //);
  //}

  return (
    <div className="add-comment-wrapper">
      <div className="add-comment-element">
        <Image src={avatar} avatar />
        <TextArea
          value={text}
          placeholder={isReply ? "Add an reply..." : "Add a comment..."}
          onChange={({ target }) => setText(target.value)}
        />
        <Button
          onClick={handleSubmit}
          disabled={disabled}
          color="blue"
          loading={loading}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
