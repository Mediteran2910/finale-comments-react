import "./likesMolecula.css";
import BeatLoader from "react-spinners/BeatLoader";
import Button from "@atoms/button/Button";
import Typography from "@atoms/typgoraphy/typography";

type Props = {
  liked: boolean | null;
  likes: number;
  loading?: boolean;
  onChange(value: boolean): Promise<void>;
};

export default function LikesMolecula({
  liked,
  likes,
  loading,
  onChange,
}: Props) {
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
        <Button onClick={() => onChange(false)} disabled={!liked} outline>
          -
        </Button>

        <Typography variant="body" color="blue">
          {likes?.toString()}
        </Typography>
        <Button onClick={() => onChange(true)} disabled={!!liked} outline>
          +
        </Button>
      </div>
    </div>
  );
}
