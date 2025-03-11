import UserInfo from "../../moleculas/userInfo/UserInfo";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import Typography from "../../atoms/typgoraphy/typography";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import "./nestedReplies.css";
export default function NestedReplies({
  user,
  handleEdit,
  editInitialText,
  setEditInitkialText,
  isEditing,
  editComment,
  replyingTo,
  handleScoreChange,
  currentUser,
  handleDeleteComment,
}) {
  return (
    <>
      {user.replies?.map((reply) =>
        isEditing === reply.id ? (
          <AddCommentElement
            key={reply.id}
            value={editInitialText}
            onChange={(e) => setEditInitialText(e.target.value)}
            onClick={() => editComment(reply)}
            isEditing={isEditing}
            currentUser={currentUser}
          />
        ) : (
          <div className="nested-replies-helper-wrapp" key={reply.id}>
            <div className="nested-replies-wrapper">
              <div className="nested-replies">
                <UserInfo user={reply} />
                <Typography
                  replayed={reply.replyingTo}
                  text={reply.content}
                  variant="body"
                  spanColor="purple"
                />
                <ButtonsWrapper
                  user={reply}
                  handleEdit={() => handleEdit(reply.id, reply.content)}
                  handleDeleteComment={handleDeleteComment}
                  handleScoreChange={handleScoreChange}
                  startReplying={() => startNestedReply(reply)}
                  nestedReply={true}
                />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
