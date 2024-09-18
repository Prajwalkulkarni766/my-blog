import React from "react";
import SignupForm from "../forms/SignupForm";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 my-container">
        <h1 className="mb-4">Sign Up</h1>
        <SignupForm buttonTxt={"Signup"} />
        <div className="mt-3">
          <NavLink to={"/login"} className="text-body text-decoration-none">
            Have an account?
          </NavLink>
        </div>
      </div>
    </>
  );
}
