import UserInfo from "../../moleculas/userInfo/UserInfo";
import AddCommentElement from "../addCommentElement/AddCommentElement";
import Typography from "../../atoms/typgoraphy/typography";
import ButtonsWrapper from "../../moleculas/buttonsWrapper/ButtonWrapper";
import { useState, useCallback } from "react";
import "./nestedReplies.css";
export default function NestedReplies({
  user,
  editComment,
  handleScoreChange,
  currentUser,
  handleDeleteComment,
}) {
  // const [editInitialText, setEditInitialText] = useState("");
  // const [isEditing, setIsEditing] = useState(false);
  // const handleEdit = useCallback(
  //   (id, content) => {
  //     setIsEditing(id);
  //     setEditInitialText(content);
  //     console.log(id);
  //     console.log(content);
  //   },
  //   [setIsEditing, setEditInitialText]
  // );
  // console.log(isEditing);
  // return (
  //   <>
  //     {user.replies?.map((reply) =>
  //       isEditing === reply.id ? (
  //         <AddCommentElement
  //           key={reply.id}
  //           value={editInitialText}
  //           onChange={(e) => setEditInitialText(e.target.value)}
  //           onClick={() =>
  //             editComment(
  //               reply,
  //               editInitialText,
  //               setEditInitialText,
  //               setIsEditing
  //             )
  //           }
  //           isEditing={isEditing}
  //           currentUser={currentUser}
  //         />
  //       ) : (
  //         <div className="nested-replies-helper-wrapp" key={reply.id}>
  //           <div className="nested-replies-wrapper">
  //             <div className="nested-replies">
  //               <UserInfo user={reply} />
  //               <Typography
  //                 replayed={reply.replyingTo}
  //                 text={reply.content}
  //                 variant="body"
  //                 spanColor="purple"
  //               />
  //               <ButtonsWrapper
  //                 user={reply}
  //                 handleEdit={() => handleEdit(reply.id, reply.content)}
  //                 handleDeleteComment={handleDeleteComment}
  //                 handleScoreChange={handleScoreChange}
  //                 startReplying={() => startNestedReply(reply)}
  //                 nestedReply={true}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       )
  // )}
  // </>
  // );
}
