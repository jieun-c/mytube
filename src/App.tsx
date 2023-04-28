import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import VideoList from "./pages/VideoList";
import VideoDetail from "./pages/VideoDetail";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  [
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
          path: "/search",
          element: <VideoList />,
        },
        {
          path: "/detail/:videoId",
          element: <VideoDetail />,
        },
      ],
    },
  ],
  { basename: "/mytube/" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
