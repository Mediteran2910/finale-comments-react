import Image from "../../atoms/image/Image";
import "./userInfo.css";
import AuthorDetails from "../../atoms/authorDetails/AuthorDetails";

export default function UserInfo({ user }) {
  return (
    <div className="user-info-wrapp">
      <div key={Math.random()} className="user-info">
        <Image
          imgSrc={user.user?.image.png}
          imgAlt={`${user.user?.username} profile image`}
          avatar={true}
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
