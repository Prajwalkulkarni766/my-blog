import React from "react";
import Navbar from "../components/Navbar";
import BlogForm from "../forms/BlogForm";

export default function Write() {
  return (
    <>
      <Navbar />
      <div className="container my-container mt-5 text-justify">
        <BlogForm />
      </div>
    </>
  );
}
