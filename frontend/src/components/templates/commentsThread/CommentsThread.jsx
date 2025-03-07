import { useComments } from "../../../hooks/useComments";
import React from "react";
import CommentCard from "../../organism/commentCard/CommentCard";
import Replies from "../../organism/replies/Replies";
import AddCommentElement from "../../organism/addCommentElement/AddCommentElement";
import "./commentsThread.css";
import { Modal } from "../../../modal/Modal";
import "../../../modal/loadingModal.css";

const CommentsThread = React.memo(() => {
  const {
    dispatch,
    error,
    loading,
    state,
    currentUser,
    addComment,
    addReply,
    handleEdit,
    editComment,
    handleDeleteComment,
    handleScoreChange,
    startReplying,
    setReplyingTo,
    replyingTo,
    isEditing,
    setIsEditing,
    editInitialText,
    setEditInitialText,
  } = useComments();

  if (loading === true) {
    return (
      <Modal isLoadingModal={true} modalText="Loading Data, please wait..." />
    );
  }

  return (
    <>
      {state.map((user) => (
        <div className="comment-reply-wrapp" key={user.id}>
          <CommentCard
            user={user}
            handleEdit={handleEdit}
            editComment={editComment}
            editInitialText={editInitialText}
            setEditInitialText={setEditInitialText}
            isEditing={isEditing}
            replyingTo={replyingTo}
            handleScoreChange={handleScoreChange}
            addReply={addReply}
            currentUser={currentUser}
            handleDeleteComment={handleDeleteComment}
            startReplying={startReplying}
          />

          {user.replies?.length > 0 && (
            <Replies
              user={user}
              handleEdit={handleEdit}
              editInitialText={editInitialText}
              setEditInitialText={setEditInitialText}
              isEditing={isEditing}
              editComment={editComment}
              replyingTo={replyingTo}
              handleScoreChange={handleScoreChange}
              currentUser={currentUser}
              handleDeleteComment={handleDeleteComment}
            />
          )}
        </div>
      ))}

      <AddCommentElement
        onClick={addComment} //careful here
        currentUser={currentUser}
        replyingTo={replyingTo}
      />
    </>
  );
});

export default CommentsThread;

///LOKALNO STATE TI MOZE, U SLUCAJU DA NIJE GENERALNI STATE(DATA)
///PAZI NA ISLOADING AKO NIJE INICJALNI RENDER, SCOUPAJ IS LOADING NA LOKALNOJ RAZINI, TJ DI SE POZIVA FUNKCIJA(AKO IMA SMISLA)
///CUSTOM HOOK PRIHVACA SVE I SVASTA, ZATO SE I ZOVE CUSTOM
