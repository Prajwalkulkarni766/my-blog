import React from "react";
import PrivateRoute from "./pages/privateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/user/Home";
import Blog from "./pages/user/Blog";
import Write from "./pages/user/Write";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import Notification from "./pages/user/Notification";
import NotFound from "./pages/NotFound";
import Profile from "./pages/user/Profile";
import About from "./pages/user/About";
import Search from "./pages/user/Search";
import Admin from "./pages/admin/Admin";
import UserReport from "./pages/admin/UserReport";
import BlogReport from "./pages/admin/BlogReport";
import OtherReport from "./pages/admin/OtherReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "home",
    element: (
      <PrivateRoute>
        <Home />,
      </PrivateRoute>
    ),
  },
  {
    path: "search",
    element: (
      <PrivateRoute>
        <Search />,
      </PrivateRoute>
    ),
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "write",
    element: (
      <PrivateRoute>
        <Write />,
      </PrivateRoute>
    ),
  },
  {
    path: "notifications",
    element: (
      <PrivateRoute>
        <Notification />
      </PrivateRoute>
    ),
  },
  {
    path: "profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "admin/user-reports",
    element: <UserReport />,
  },
  {
    path: "admin/blog-reports",
    element: <BlogReport />,
  },
  {
    path: "admin/other-reports",
    element: <OtherReport />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      <Loading />
    </>
  );
}
