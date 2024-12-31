import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/admin"}>
          Admin Page
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to={"#"}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Reports
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to={"/admin/user-reports"}>
                    User reports
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to={"/admin/blog-reports"}>
                    Blog reports
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={"/admin/other-reports"}
                  >
                    Clap and Comment reports
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/admin/push-notification"}>
                Push notification
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
