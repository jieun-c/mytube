import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import VideoList from "./pages/VideoList";
import VideoDetail from "./pages/VideoDetail";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <VideoList />,
      },
      {
        path: "/videos",
        element: <Navigate to="/" />,
      },
      {
        path: "/videos/:videoId",
        element: <VideoDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
