import Avatar from "../../atoms/avatar/Avatar";
import "./userInfo.css";
import AuthorDetails from "../../atoms/authorDetails/AuthorDetails";

export default function UserInfo({ user }) {
  return (
    <div className="user-info-wrapp">
      <div key={Math.random()} className="user-info">
        <Avatar
          imgSrc={user.user?.image.png}
          imgAlt={`${user.user?.username} profile image`}
          className="avatar"
        />

        <AuthorDetails
          isCurrentUser={user.isYou}
          username={user.user?.username}
          postTime={user.createdAt}
        />
      </div>
    </div>
  );
}
