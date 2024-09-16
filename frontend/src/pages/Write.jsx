import React from "react";
import CustomTextArea from "../components/CustomTextArea";
import Navbar from "../components/Navbar";

export default function Write() {
  return (
    <>
      <Navbar />
      <div className="container my-container mt-5 text-justify">
        {/* primary-heading */}
        <CustomTextArea contentType={"h1"} placeholder={"Title"} />

        {/* secondary-heading  */}
        <CustomTextArea
          contentType={"h4"}
          placeholder={"Sub title"}
          className={"text-secondary"}
        />

        {/* content */}
        <CustomTextArea contentType={"p"} placeholder={"Content"} />

        <button className="btn my-btn">Publish</button>
      </div>
    </>
  );
}
