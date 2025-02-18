import "./App.css";
import { CommentsProvider } from "./context/CommentsContext";
import CommentsThread from "./components/templates/commentsThread/CommentsThread";
import { ReplyingProvider } from "./context/ReplyingContext";

function App() {
  return (
    <CommentsProvider>
      <ReplyingProvider>
        <CommentsThread />
      </ReplyingProvider>
    </CommentsProvider>
  );
}

export default App;
