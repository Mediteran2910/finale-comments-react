import React from "react";
import "./authorDetails.css";
import Typography from "../typgoraphy/typography";

type Props = {
  username: string;
  isCurrentUser?: boolean;
  postTime: string;
};

/** @todo move to molecule */
export default function AuthorDetails({
  username,
  isCurrentUser,
  postTime,
}: Props) {
  return (
    <div className="author-details-wrapp">
      {isCurrentUser && (
        <Typography variant="overline" color="background-blue">
          you
        </Typography>
      )}
      <Typography variant="body" bold>
        {username}
      </Typography>
      <Typography variant="caption">{postTime}</Typography>
    </div>
  );
}
