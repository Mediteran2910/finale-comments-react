import LikeButton from "../../atoms/likeButton/LikeButton";
import LikeCounter from "../../atoms/likeCounter/likeCounter";
import { useContext, useState } from "react";

import "./likesMolecula.css";
import { sendData } from "../../../services/sendData";

export default function LikesMolecula({ user }) {
  const [score, setScore] = useState(user.score);

  const UrlLikes = `http://localhost:8000/comments/${user.id}/like`;

  const updateScore = async (newScore) => {
    const obj = { newScore: newScore };

    const response = await sendData(UrlLikes, obj);

    if (response) {
      setScore(newScore);
    } else {
      console.error("Failed to update score on the backend");
    }
  };

  const incrementScore = () => {
    if (score == user.score + 1) return score;
    else updateScore(score + 1);
  };

  const decrementScore = () => {
    if (score == user.score - 1) return score;
    else updateScore(score - 1);
  };

  return (
    <div className="likes-wrapper">
      <LikeButton sign="-" onClick={decrementScore} />
      <LikeCounter numOfLikes={score} />
      <LikeButton sign="+" onClick={incrementScore} />
    </div>
  );
}
