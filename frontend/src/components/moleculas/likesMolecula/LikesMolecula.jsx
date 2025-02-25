import LikeButton from "../../atoms/likeButton/LikeButton";
import LikeCounter from "../../atoms/likeCounter/likeCounter";
import "./likesMolecula.css";
import { useAPI } from "../../../hooks/useAPI";
import { requestObjects, requestUrls } from "../../../services/requestObjects";
import { updateScore } from "../../../utils/updateScore";
import { useState, CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";

export default function LikesMolecula({ commentsData, setCommentsData, user }) {
  const { isLoading, isError, makeApiRequest } = useAPI();

  const incrementScore = async () => {
    const url = requestUrls(user).likesUrl;
    let newScore = user.score + 1;

    const response = await makeApiRequest(url, requestObjects.patchRequest, {
      newScore,
    });

    if (response) {
      updateScore(setCommentsData, newScore, user.id);

      console.log("Response is ok, and likes are updated.");
    }
  };

  const decrementScore = async () => {
    const url = requestUrls(user).likesUrl;
    let newScore = user.score - 1;

    const response = await makeApiRequest(url, requestObjects.patchRequest, {
      newScore,
    });

    if (response) {
      updateScore(setCommentsData, newScore, user.id);

      console.log("Response is ok, and likes are updated.");
    }
  };

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
        <LikeButton sign="-" onClick={decrementScore} />
        <LikeCounter numOfLikes={user.score} />
        <LikeButton sign="+" onClick={incrementScore} />
      </div>
    </>
  );
}

// const incrementScore = async () => {
//   const url = requestUrls(user).likesUrl;

//   let newScore = user.score + 1;
//   updateScore(setCommentsData, newScore, user.id);
//   console.log("Like updated successfully.");

//   const response = await makeApiRequest(url, requestObjects.putRequest, {
//     newScore,
//   });

//   if (response) {
//     console.log("response is here and everything is fine");
//   } else {
//     let newScore = user.score;
//     updateScore(setCommentsData, newScore, user.id);
//   }
// };
