import { createContext, useState } from "react";

export const ReplyingToContext = createContext();

export function ReplyingProvider({ children }) {
  const [replyingTo, setReplyingTo] = useState(null);

  return (
    <ReplyingToContext.Provider value={{ replyingTo, setReplyingTo }}>
      {children}
    </ReplyingToContext.Provider>
  );
}
