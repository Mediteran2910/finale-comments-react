import "./App.css";
import CommentsThread from "./components/templates/commentsThread/CommentsThread";
import { ReplyingProvider } from "./context/ReplyingContext";

function App() {
  return (
    <ReplyingProvider>
      <CommentsThread />
    </ReplyingProvider>
  );
}

export default App;
