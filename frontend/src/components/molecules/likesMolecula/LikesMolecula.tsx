import "./likesMolecula.css";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

import Button from "@atoms/button/Button";
import Typography from "@atoms/typgoraphy/typography";

type Props = {
  liked: boolean | null;
  likes: number;
  onChange(value: boolean): Promise<void>;
};

export default function LikesMolecula({ liked, likes, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  const handleOnChange = (v: boolean) => {
    setLoading(true);
    onChange(v);
    setLoading(false);
  };

  /** @todo wrap around it all **/
  if (loading) {
    return (
      <div className="likes-wrapper">
        <BeatLoader loading={true} size={8} color="grey" />
      </div>
    );
  }

  return (
    <div className="likes-wrapper">
      <div style={{ visibility: loading ? "hidden" : undefined }}>
        <Button onClick={() => handleOnChange(false)} disabled={!liked} outline>
          -
        </Button>

        <Typography variant="body" color="blue">
          {likes?.toString()}
        </Typography>
        <Button onClick={() => handleOnChange(true)} disabled={!!liked} outline>
          +
        </Button>
      </div>
    </div>
  );
}
