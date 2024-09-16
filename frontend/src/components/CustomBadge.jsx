import React from "react";

export default function CustomBadge({ content, isActive }) {
  return (
    <li className="nav-item">
      <p
        className={`nav-link badge rounded-pill text-bg-light ${isActive ? "" : "text-secondary"} cursor-pointer`}
        style={{ fontSize: "0.9rem" }}
      >
        {content}
      </p>
    </li>
  );
}