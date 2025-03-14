import React from "react";
import Image from "../../atoms/image/Image";
import "./userInfo.css";
import Typography from "../../atoms/typgoraphy/typography";

type Props = {
  user: {
    user?: {
      image: { png: string };
      username: string;
      postTime: string;
    };
  };
  isCurrentUser: boolean;
};

export default function UserInfo({ user, isCurrentUser }: Props) {
  return (
    <div className="user-info-wrapp">
      <div className="user-info">
        <Image
          src={user.user?.image.png}
          alt={`${user.user?.username} profile image`}
          avatar
        />

        {isCurrentUser && (
          <Typography variant="overline" color="blue" badge>
            you
          </Typography>
        )}
        <Typography variant="body" bold>
          {user.user?.username}
        </Typography>
        <Typography variant="caption">{user.user?.postTime}</Typography>
      </div>
    </div>
  );
}
