import { useContext, useState } from "react";
import React from "react";
import CommentCard from "../../organism/commentCard/CommentCard";
import Replies from "../../organism/replies/Replies";
import AddCommentElement from "../../organism/addCommentElement/AddCommentElement";
import "./commentsThread.css";
import { CommentsContext } from "../../../context/CommentsContext";
import { sendData } from "../../../services/sendData";
import { updateData } from "../../../services/updateData";
import LoadingModal from "../../../modal/LoadingModal";

const CommentsThread = React.memo(() => {
  const { commentsData, setCommentsData, loading } =
    useContext(CommentsContext);
  const [commentText, setCommentText] = useState("");

  const addComment = async (e) => {
    e.preventDefault();
    const urlAddComment = "http://localhost:8000/comments";

    const newPersonalComment = {
      content: commentText,
      isYou: true,
    };

    if (commentText !== "") {
      const response = await sendData(urlAddComment, newPersonalComment);
      if (response) {
        setCommentsData((prevData) => ({
          ...prevData,
          otherUsers: [...prevData.otherUsers, response],
        }));
        setCommentText("");
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

  const editComment = async () => {
    if (!editInitialText.trim()) return;

    const updatedCommentObj = { content: editInitialText };

    const urlUpdateComment = `http://localhost:8000/comment/edit/${isEditing}`;

    console.log("Updating:", urlUpdateComment, updatedCommentObj.content);

    try {
      const response = await updateData(urlUpdateComment, updatedCommentObj);
      if (response) {
        setCommentsData((prevData) => ({
          ...prevData,
          otherUsers: prevData.otherUsers.map((comment) => {
            // Check if this is the comment being updated
            if (comment.id === isEditing) {
              return { ...comment, content: response.content };
            }
            // Check if this comment has the reply being updated
            if (comment.replies) {
              return {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === isEditing
                    ? { ...reply, content: response.content }
                    : reply
                ),
              };
            }
            return comment;
          }),
        }));

        setIsEditing(null);
      } else {
        console.error("Failed to update comment on backend");
      }
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  if (loading) {
    return <LoadingModal />;
  }
  return (
    <>
      {commentsData.otherUsers.map((user) => (
        <div className="comment-reply-wrapp" key={user.id}>
          <>
            <CommentCard
              user={user}
              commentText={commentText}
              setCommentText={setCommentText}
              handleEdit={handleEdit}
              isEditing={isEditing}
              editInitialText={editInitialText}
              setEditInitialText={setEditInitialText}
              editComment={editComment}
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
              />
            )}
          </>
        </div>
      ))}
      <AddCommentElement
        onClick={addComment}
        setCommentText={setCommentText}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
    </>
  );
});

export default CommentsThread;
