import UserInfo from "../../moleculas/userInfo/UserInfo";
import CommentText from "../../moleculas/commentText/CommentText";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";

export default function PersonalComment({ user }) {
  return (
    <div>
      <UserInfo user={user} />
      <CommentText user={user} />
      <ButtonsWrapper personalComment={true} />
    </div>
  );
}
