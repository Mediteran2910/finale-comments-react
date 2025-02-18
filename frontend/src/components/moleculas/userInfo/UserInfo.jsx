import Avatar from "../../atoms/avatar/Avatar";
import PostTime from "../../atoms/postTime/PostTime";
import Username from "../../atoms/username/Username";
import PersonalTag from "../../atoms/personalTag/PersonalTag";
import "./userInfo.css";

export default function UserInfo({ user }) {
  return (
    <>
      <div className="user-info-wrapp">
        <div key={Math.random()} className="user-info">
          <Avatar
            imgSrc={user.user?.image.png}
            imgAlt={`${user.user?.username} profile image`}
          />
          {user.isYou && <PersonalTag />}
          <Username username={user.user?.username} />
        </div>
        <PostTime postTime={user.createdAt} />
      </div>
    </>
  );
}
