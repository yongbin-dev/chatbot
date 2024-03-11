
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/chat", element: <ChatPage /> },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
