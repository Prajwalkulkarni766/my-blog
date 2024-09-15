import React from "react";

export default function Signup() {
    return (
        <div className="container mt-3 my-container">
            <h1 className="mb-4">Sign Up</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="user_name" className="form-label">User Name</label>
                    <input type="email" className="form-control" id="user_name" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">User name must be unique.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email_address" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email_address" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm_password" />
                </div>
                <button type="submit" className="btn my-btn">Signup</button>
            </form>
        </div>
    )
}