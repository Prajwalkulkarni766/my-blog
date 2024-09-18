import React from "react";
import Navbar from "../components/Navbar";
import SignupForm from "../forms/SignupForm";
import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
  const profile = useSelector((state) => state.profile.profile);

  return (
    <>
      <Navbar />
      <div className="container my-container mt-5">
        <h1>Profile</h1>
        <SignupForm buttonTxt={"Update"} />
      </div>
    </>
  );
}
