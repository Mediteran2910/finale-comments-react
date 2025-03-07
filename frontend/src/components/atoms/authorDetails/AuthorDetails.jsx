import "./authorDetails.css";

export default function AuthorDetails({ username, isCurrentUser, postTime }) {
  return (
    <div className="author-details-wrapp">
      {isCurrentUser && <p className="personal-tag">you</p>}
      <p className="username">{username}</p>
      <p className="post-time">{postTime}</p>
    </div>
  );
}
