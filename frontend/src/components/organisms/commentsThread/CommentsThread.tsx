import "./commentsThread.css";

import { useMemo } from "react";
import { BeatLoader } from "react-spinners";

import Typography from "@atoms/typgoraphy/typography";
import { useComments } from "@hooks/useComments";
import AddCommentElement from "@molecules/addCommentElement/AddCommentElement";
import CommentCard from "@organisms/commentCard/CommentCard";
import { User } from "@types";

export default function CommentsThread() {
  /** @todo move this up **/
  const comments = useComments();

  const currentUser = useMemo(
    (): User =>
      comments.currentUser ?? { username: "unknown", image: { png: "none" } },
    [comments.currentUser],
  );

  if (comments.loading === true) {
    return (
      <dialog className="modal-element">
        <div className={"modal-loading"}>
          <Typography variant="body">Loading data, please wait...</Typography>
          <BeatLoader />
        </div>
      </dialog>
    );
  }

  return (
    <>
      {comments.state.map((comment) => (
        <div className="comment-reply-wrapp" key={comment.id}>
          <CommentCard
            comment={comment}
            currentUser={currentUser}
            handleScoreChange={comments.handleScoreChange}
            handleCreateComment={comments.handleCreateComment}
            handleDeleteComment={comments.handleDeleteComment}
            handleUpdateComment={comments.handleUpdateComment}
          />
        </div>
      ))}

      {comments.currentUser && (
        <AddCommentElement
          avatar={comments.currentUser?.image.png}
          buttonText="Send"
          placeholder="Add a comment..."
          onSubmit={comments.addComment}
        />
      )}
    </>
  );
}
