import React from "react";
import Navbar from "../components/Navbar";

export default function UnauthorizedPage() {
  return (
    <>
      <Navbar />
      <div className="container my-container mt-5">
        <div className="text-center">
          <h1>401</h1>
          <p>
            You must be logged in to access this page!{" "}
            <span role="img" aria-label="confused face">
              😕
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
