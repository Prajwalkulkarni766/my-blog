import React from "react";
import Navbar from "../components/Navbar";
import ProfileForm from "../forms/ProfileForm";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="container my-container mt-5">
        <h1>Profile</h1>
        <ProfileForm buttonTxt={"Update"} />
      </div>
    </>
  );
}
