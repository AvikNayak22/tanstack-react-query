import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WithoutQuery from "./pages/WithoutQuery.jsx";
import WithQuery from "./pages/WithQuery.jsx";
import Post from "./pages/Post.jsx";
import WithInfiniteQuery from "./pages/WithInfiniteQuery.jsx";
import Tasks from "./pages/Tasks.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/withoutquery", element: <WithoutQuery /> },
  { path: "/withquery", element: <WithQuery /> },
  { path: "/withquery/:id", element: <Post /> },
  { path: "/withinfinitequery", element: <WithInfiniteQuery /> },
  { path: "/tasks", element: <Tasks /> },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
