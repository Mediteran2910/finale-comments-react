export type User = {
  image: {
    png: string;
  };
  username: string;
};

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  isLiked: boolean | null;
  user: User;
  isYou: boolean;
  replies: Reply[];
};

export type Reply = {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  isLiked: boolean;
  user: User;
  replyingTo: string;
  isYou: boolean;
  replies: Reply[];
};
