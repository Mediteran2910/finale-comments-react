import { createContext, useState, useEffect } from "react";
import { useComments } from "../hooks/useComments";

export const CommentsContext = createContext();

export function CommentsProvider({ children }) {
  const commentsState = useComments();

  return (
    <CommentsContext.Provider value={commentsState}>
      {children}
    </CommentsContext.Provider>
  );
}
