import LikeCounter from "../../atoms/likeCounter/likeCounter";
import "./likesMolecula.css";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";
import Button from "../../atoms/button/Button";
import Typography from "../../atoms/typgoraphy/typography";

export default function LikesMolecula({ user, handleScoreChange }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleScore = async (increment) => {
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
        <Button
          onClick={() => handleScore(false)}
          disabled={user.isLiked === false}
          outline={true}
        >
          {" "}
          -
        </Button>

        <Typography text={user.score} variant="body" color="primary-blue" />
        <Button
          onClick={() => handleScore(true)}
          disabled={user.isLiked === true}
          outline={true}
        >
          +
        </Button>
      </div>
    </>
  );
}
