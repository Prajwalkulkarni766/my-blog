import React from "react";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="container mt-3 my-container">
        <h1 className="mb-4">Login</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email_address" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email_address"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember_me"
            />
            <label className="form-check-label" htmlFor="remember_me">
              Remember Me
            </label>
          </div>
          <button type="submit" className="btn my-btn">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
