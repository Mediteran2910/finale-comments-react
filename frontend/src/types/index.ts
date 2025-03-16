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
  replyingTo: string;
  user: User;
  isYou: boolean;
  replies?: Comment[];
};

