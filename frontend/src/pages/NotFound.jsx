import React from "react";
import Navbar from "../components/user/Navbar";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function NotFound() {
  const isAdmin = window.location.href.includes("admin");
  return (
    <>
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <div className="container my-container mt-5">
        <div className="text-center">
          <h1>404</h1>
          <p>
            Page not found!{" "}
            <span role="img" aria-label="confused face">
              😕
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
