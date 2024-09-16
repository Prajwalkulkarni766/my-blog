import React from "react";
// import PrivateRoute from "./pages/private/PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notification from "./pages/Notification";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import About from "./pages/About";

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
    element: <Home />,
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "write",
    element: <Write />,
  },
  {
    path: "notifications",
    element: <Notification />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <>
      {/* <Navbar /> */}
      <RouterProvider router={router} />
      <ToastContainer />
      <Loading />
    </>
  );
}
