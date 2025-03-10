import "./authorDetails.css";
import Typography from "../typgoraphy/typography";

export default function AuthorDetails({ username, isCurrentUser, postTime }) {
  return (
    <div className="author-details-wrapp">
      {isCurrentUser && (
        <Typography variant="overline" color="background-blue" text="you" />
      )}
      <Typography variant="body" text={username} bold={true} />
      <Typography variant="caption" text={postTime} />
    </div>
  );
}
