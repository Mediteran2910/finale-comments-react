import { useState } from "react";

import Button from "@atoms/button/Button";
import Image from "@atoms/image/Image";
import TextArea from "@atoms/textarea/TextArea";

import "./addCommentElement.css";

type Props = {
  avatar: string;
  onSubmit: (text: string) => Promise<void>;
  intialValue?: string;
  buttonText: string;
  placeholder: string;
};

export default function AddCommentElement({
  avatar,
  buttonText,
  intialValue = "",
  onSubmit,
  placeholder,
}: Props) {
  const [text, setText] = useState(intialValue);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(text)
      .then(() => setEditing(false))
      .finally(() => setLoading(false));
  };

  const disabled = loading || (editing && text.trim() === "");

  return (
    <div className="add-comment-wrapper">
      <div className="add-comment-element">
        <Image src={avatar} avatar />
        <TextArea
          value={text}
          placeholder={placeholder}
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
