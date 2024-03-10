
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter([
  { path: "/", element: <ChatPage /> },
  { path: "/chat", element: <ChatPage /> },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
