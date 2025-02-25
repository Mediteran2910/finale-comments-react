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
  const { content, replyingTo } = req.body;
  const commentId = req.params.id;

  const commentsData = getCommentsData();

  const parentComment = commentsData.otherUsers.find(
    (comment) => comment.id === commentId
  );

  if (!parentComment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (!parentComment.replies) {
    parentComment.replies = [];
  }

  const newReply = {
    id: uuidv4(),
    content: req.body.content,
    createdAt: "Just now",
    score: 0,
    replyingTo,
    user: commentsData.currentUser,
    isYou: true,
  };

  parentComment.replies.push(newReply);

  saveCommentsData(commentsData, res, newReply);
});

app.patch("/comments/:id/like", (req, res) => {
  const commentId = req.params.id;
  const newScore = req.body.newScore;
  const commentsData = getCommentsData();
  let found = false;

  commentsData.otherUsers.forEach((comment) => {
    if (comment.id === commentId) {
      comment.score = newScore;
      found = true;
    }

    comment.replies.forEach((reply) => {
      if (reply.id === commentId) {
        reply.score = newScore;
        found = true;
      }
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
