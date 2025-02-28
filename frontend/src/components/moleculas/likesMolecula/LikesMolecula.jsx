import LikeButton from "../../atoms/likeButton/LikeButton";
import LikeCounter from "../../atoms/likeCounter/likeCounter";
import "./likesMolecula.css";
import { useAPI } from "../../../hooks/useAPI";
import BeatLoader from "react-spinners/BeatLoader";

export default function LikesMolecula({
  user,
  incrementScore,
  decrementScore,
}) {
  const { isLoading, isError } = useAPI();

  if (isLoading) {
    return (
      <div className="likes-wrapper">
        <BeatLoader loading={true} size={8} color="grey" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="likes-wrapper" style={{ border: "2px solid red" }}>
        <p style={{ color: "red", fontSize: "12px" }}>Erorr, try again later</p>
      </div>
    );
  }

  return (
    <>
      <div key={user.id} className="likes-wrapper">
        <LikeButton sign="-" onClick={() => decrementScore(user)} />
        <LikeCounter numOfLikes={user.score} />
        <LikeButton sign="+" onClick={() => incrementScore(user)} />
      </div>
    </>
  );
}
