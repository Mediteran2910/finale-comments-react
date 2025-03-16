import "./commentsThread.css";

import { useMemo } from "react";

import { useComments } from "@hooks/useComments";
import AddCommentElement from "@molecules/addCommentElement/AddCommentElement";
import { Modal } from "@molecules/modal/Modal";
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
    return <Modal loadingModal={true} />;
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
