import UserInfo from "../../moleculas/userInfo/UserInfo";
import CommentText from "../../moleculas/commentText/CommentText";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import "./replies.css";

export default function Replies({
  user,
  handleEdit,
  editComment,
  editInitialText,
  setEditInitialText,
  isEditing,
  commentsData,
  setCommentsData,
}) {
  return (
    <>
      {user.replies?.map((reply) =>
        isEditing === reply.id ? (
          <AddCommentElement
            key={reply.id}
            value={editInitialText}
            onChange={(e) => setEditInitialText(e.target.value)}
            onClick={() => editComment(user.id)}
            commentsData={commentsData}
            setCommentsData={setCommentsData}
            isEditing={isEditing}
          />
        ) : (
          <div className="replies-wrapper" key={reply.id}>
            <div className="replies">
              <UserInfo user={reply} />
              <CommentText user={reply} />
              <ButtonsWrapper
                user={reply}
                handleEdit={() => handleEdit(reply.id, reply.content)}
                commentsData={commentsData}
                setCommentsData={setCommentsData}
              />
            </div>
          </div>
        )
      )}
    </>
  );
}
