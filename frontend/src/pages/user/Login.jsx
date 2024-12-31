import React from "react";
import Navbar from "../../components/user/Navbar";
import { NavLink } from "react-router-dom";
import LoginForm from "../../forms/LoginForm";

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 my-container">
        <h1 className="mb-4">Login</h1>
        <LoginForm buttonTxt={"Login"} />
        <div className="mt-3">
          <NavLink to={"/signup"} className="text-body text-decoration-none">
            Don't have an account?
          </NavLink>
        </div>
      </div>
    </>
  );
}
