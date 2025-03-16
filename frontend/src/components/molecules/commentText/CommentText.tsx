import "./commentText.css";

import Typography from "@atoms/typgoraphy/typography";

type Props = {
  user: { replyingTo?: string; content: string };
};

export default function CommentText({ user }: Props) {
  return (
    <div className="comment-text-wrapp">
      {user.replyingTo && (
        <Typography variant="body" color="blue">
          @{user.replyingTo}
        </Typography>
      )}{" "}
      <Typography variant="body">{user.content}</Typography>
    </div>
  );
}
