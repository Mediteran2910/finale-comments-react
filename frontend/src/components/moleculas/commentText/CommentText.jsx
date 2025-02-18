import Text from "../../atoms/text/Text";
import ReplyingTo from "../../atoms/replyingTo/ReplyingTo";
import "./commentText.css";

export default function CommentText({ user }) {
  return (
    <Text>
      {user.replyingTo && <ReplyingTo>@{user.replyingTo}</ReplyingTo>}{" "}
      {user.content}
    </Text>
  );
}
