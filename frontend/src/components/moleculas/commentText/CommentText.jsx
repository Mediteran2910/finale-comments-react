import Typography from "../../atoms/typgoraphy/typography";
import "./commentText.css";

export default function CommentText({ user }) {
  return (
    <div className="comment-text-wrapp">
      <Typography variant="body" text={user.content}>
        {user.replyingTo && (
          <span variant="overline-blue">@{user.replyingTo}</span>
        )}{" "}
      </Typography>
    </div>
  );
}
