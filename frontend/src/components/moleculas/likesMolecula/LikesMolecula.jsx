import LikeButton from "../../atoms/likeButton/LikeButton";
import LikeCounter from "../../atoms/likeCounter/likeCounter";
import "./likesMolecula.css";
import { useAPI } from "../../../hooks/useAPI";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";

export default function LikesMolecula({ user, handleScoreChange }) {
  const [isLoading, setIsLoading] = useState(false);

  const handle = async (increment) => {
    setIsLoading(true);
    await handleScoreChange(user, increment);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="likes-wrapper">
        <BeatLoader loading={true} size={8} color="grey" />
      </div>
    );
  }

  return (
    <>
      <div key={user.id} className="likes-wrapper">
        <LikeButton
          sign="-"
          onClick={() => handle(false)}
          disabled={user.isLiked === false}
        />
        <LikeCounter numOfLikes={user.score} />
        <LikeButton
          sign="+"
          onClick={() => handle(true)}
          disabled={user.isLiked === true}
        />
      </div>
    </>
  );
}
