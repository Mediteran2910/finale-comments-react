import { useState } from "react";
import { useComments } from "../../../hooks/useComments";
import React from "react";
import CommentCard from "../../organism/commentCard/CommentCard";
import Replies from "../../organism/replies/Replies";
import AddCommentElement from "../../organism/addCommentElement/AddCommentElement";
import "./commentsThread.css";
import LoadingModal from "../../../modal/LoadingModal";
import { useAPI } from "../../../hooks/useAPI";
import { edit } from "../../../utils/editComment";
import {
  requestObjects,
  requestUrls,
  staticUrls,
} from "../../../services/requestObjects";
import { addNewComment } from "../../../utils/addComment";

const CommentsThread = React.memo(() => {
  const { commentsData, setCommentsData, loading } = useComments();
  const { isLoading, isError, makeApiRequest } = useAPI();
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const addComment = async () => {
    const url = staticUrls.addCommentUrl;
    const newPersonalComment = {
      content: commentText,
    };
    if (commentText !== "") {
      const response = await makeApiRequest(
        url,
        requestObjects.postRequest,
        newPersonalComment
      );
      if (response) {
        addNewComment(setCommentsData, setCommentText, response);
        console.log(response);
        console.log("response is ok, new comment added");
      } else {
        console.error("Failed to add personal comment on the backend", error);
      }
    }
    return;
  };

  const [isEditing, setIsEditing] = useState(null);
  const [editInitialText, setEditInitialText] = useState("");

  const handleEdit = (id, content) => {
    setIsEditing(id);
    setEditInitialText(content);
    console.log(id);
  };

  const editComment = async (user) => {
    const updatedCommentObj = { content: editInitialText };

    const url = requestUrls(user).editUrl;
    try {
      const response = await makeApiRequest(
        url,
        requestObjects.patchRequest,
        updatedCommentObj
      );
      if (response) {
        edit(setCommentsData, isEditing, setIsEditing, response);
      } else {
        console.error("Failed to update comment on backend");
      }
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  if (loading === true) {
    return <LoadingModal />;
  }

  if (isLoading) {
    return <p>LOADING...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }
  return (
    <>
      {commentsData.otherUsers.map((user) => (
        <div className="comment-reply-wrapp" key={user.id}>
          <CommentCard
            user={user}
            commentText={commentText}
            setCommentText={setCommentText}
            handleEdit={handleEdit}
            isEditing={isEditing}
            editInitialText={editInitialText}
            setEditInitialText={setEditInitialText}
            editComment={editComment}
            commentsData={commentsData}
            setCommentsData={setCommentsData}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
          />

          {user.replies?.length > 0 && (
            <Replies
              user={user}
              setCommentText={setCommentText}
              commentText={commentText}
              handleEdit={handleEdit}
              isEditing={isEditing}
              editInitialText={editInitialText}
              setEditInitialText={setEditInitialText}
              editComment={editComment}
              commentsData={commentsData}
              setCommentsData={setCommentsData}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          )}
        </div>
      ))}
      <AddCommentElement
        onClick={addComment}
        setCommentText={setCommentText}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        commentsData={commentsData}
        setCommentsData={setCommentsData}
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
      />
    </>
  );
});

export default CommentsThread;
