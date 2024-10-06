import React from "react";
import Navbar from "../components/Navbar";
// import plus from "../assets/plus.svg";
import BlogForm from "../forms/BlogForm";

export default function Write() {
  return (
    <>
      <Navbar />
      <div className="container my-container mt-5 text-justify">
        {/* primary-heading */}
        {/* <CustomTextArea contentType={"h1"} placeholder={"Title"} /> */}

        {/* secondary-heading  */}
        {/* <CustomTextArea
          contentType={"h4"}
          placeholder={"Sub title"}
          className={"text-secondary"}
        /> */}

        {/* content */}
        {/* <CustomTextArea contentType={"p"} placeholder={"Content"} /> */}

        <BlogForm />
      </div>
    </>
  );
}
