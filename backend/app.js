const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const saveCommentsData = (data, res, successMessage) => {
  fs.writeFile("./commentsData.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({ message: "Failed to save data" });
    }
    res.status(201).json(successMessage);
  });
};

const getCommentsData = () => {
  const data = fs.readFileSync("./commentsData.json", "utf8");
  return JSON.parse(data);
};

app.get("/comments", (req, res) => {
  const commentsData = getCommentsData();
  res.json(commentsData);
});

app.get("/comments/:id", (req, res) => {
  const commentId = req.params.id;
  const commentsData = getCommentsData();
  const comment = commentsData.otherUsers.find((c) => c.id === commentId);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
});

app.post("/comments", (req, res) => {
  const commentsData = getCommentsData();

  const newComment = {
    id: uuidv4(),
    content: req.body.content,
    createdAt: "Just now",
    score: 0,
    user: commentsData.currentUser,
    isYou: true,
    replies: [],
  };

  commentsData.otherUsers.push(newComment);

  saveCommentsData(commentsData, res, newComment);
});

app.post("/comments/:id/replies", (req, res) => {
  const commentsData = getCommentsData();
  const parentCommentId = req.params.id;
  let found = false;

  const newReply = {
    id: uuidv4(),
    content: req.body.content,
    createdAt: "Just now",
    score: 0,
    user: commentsData.currentUser,
    replyingTo: req.body.replyingTo,
    isYou: true,
    replies: [], // Ensure replies array exists
  };

  function addReplyToComment(comment) {
    if (comment.id === parentCommentId) {
      if (!comment.replies) comment.replies = []; // Ensure replies array exists
      comment.replies.push(newReply);
      found = true;
      return;
    }

    comment.replies?.forEach((reply) => {
      if (reply.id === parentCommentId) {
        if (!reply.replies) reply.replies = []; // Ensure replies array exists
        reply.replies.push(newReply);
        found = true;
        return;
      }

      reply.replies?.forEach((nestedReply) => {
        if (nestedReply.id === parentCommentId) {
          if (!nestedReply.replies) nestedReply.replies = []; // Ensure replies array exists
          nestedReply.replies.push(newReply);
          found = true;
          return;
        }
      });
    });
  }

  commentsData.otherUsers.forEach(addReplyToComment);

  if (!found) {
    return res.status(404).json({ message: "Comment not found" });
  }

  saveCommentsData(commentsData, res, newReply);
});

app.patch("/comments/:id/like", (req, res) => {
  const commentId = req.params.id;
  const newScore = req.body.newScore;
  const commentsData = getCommentsData();
  let found = false;

  commentsData.otherUsers.forEach((comment) => {
    if (comment.id === commentId) {
      comment.score = newScore.score;
      comment.isLiked = newScore.isLiked;
      found = true;
    }

    comment.replies.forEach((reply) => {
      if (reply.id === commentId) {
        reply.score = newScore.score;
        reply.isLiked = newScore.isLiked;
        found = true;
      }

      reply.replies.forEach((nestedReply) => {
        if (nestedReply.id === commentId) {
          nestedReply.score = newScore.score;
          nestedReply.isLiked = newScore.isLiked;
          found = true;
        }
      });
    });
  });

  if (!found) {
    return res.status(404).json({ message: "Comment or reply not found" });
  }

  saveCommentsData(commentsData, res, {
    message: "Score updated successfully",
  });
});

app.patch("/comment/edit/:id", (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;

  const commentsData = getCommentsData();
  let updated = false;
  let updatedContent = null;

  commentsData.otherUsers = commentsData.otherUsers.map((comment) => {
    if (comment.id === commentId) {
      updated = true;
      updatedContent = content;
      return { ...comment, content };
    }

    if (comment.replies) {
      comment.replies = comment.replies.map((reply) => {
        if (reply.id === commentId) {
          updated = true;
          updatedContent = content;
          return { ...reply, content };
        }
        return reply;
      });
    }

    return comment;
  });

  if (!updated) {
    return res.status(404).json({ message: "Comment or reply not found" });
  }

  saveCommentsData(commentsData, res, { content: updatedContent });
});

app.delete("/comment/delete/:id", (req, res) => {
  const commentId = req.params.id;
  const commentsData = getCommentsData();

  const commentIndex = commentsData.otherUsers.findIndex(
    (comment) => comment.id === commentId
  );

  if (commentIndex !== -1) {
    commentsData.otherUsers.splice(commentIndex, 1);
  } else {
    let foundReply = false;

    commentsData.otherUsers.forEach((comment) => {
      const replyIndex = comment.replies.findIndex(
        (reply) => reply.id === commentId
      );

      if (replyIndex !== -1) {
        comment.replies.splice(replyIndex, 1);
        foundReply = true;
      }
    });

    if (!foundReply) {
      return res.status(404).json({ message: "Comment or reply not found" });
    }
  }

  saveCommentsData(commentsData, res, {
    message: "Comment deleted successfully",
  });
  return res.status(200).json({ message: "Comment deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
