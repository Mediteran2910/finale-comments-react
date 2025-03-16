import React from "react";
import Image from "../../atoms/image/Image";
import "./userInfo.css";
import Typography from "../../atoms/typgoraphy/typography";

type Props = {
  image: string;
  username: string;
  postTime: string;
  isCurrentUser: boolean;
};

export default function UserInfo({
  image,
  username,
  postTime,
  isCurrentUser,
}: Props) {
  return (
    <div className="user-info-wrapp">
      <div className="user-info">
        <Image src={image} alt={`${username} profile image`} avatar />

        {isCurrentUser && (
          <Typography variant="overline" color="blue" badge>
            you
          </Typography>
        )}
        <Typography variant="body" bold>
          {username}
        </Typography>
        <Typography variant="caption">{postTime}</Typography>
      </div>
    </div>
  );
}
