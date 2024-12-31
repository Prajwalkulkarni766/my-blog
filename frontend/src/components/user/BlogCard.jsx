import React from "react";
import user from "../../assets/user.webp";
import { NavLink } from "react-router-dom";

export default function BlogCard({ blog }) {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedTitle = truncateText(blog.title, 72);
  const truncatedSubtitle = truncateText(blog.sub_title, 85);

  return (
    <NavLink
      className="card border-0 cursor-pointer text-decoration-none"
      to={`/blog?id=${blog.id}`}
    >
      <img
        src={
          blog.image
            ? `http://localhost:8000/${blog.image}`
            : `https://placehold.co/600x350?text=Blog+Image&font=lora`
        }
        className="card-img img-thumbnail border-0 rounded mb-3"
        alt="Blog thumnail"
      />
      <div className="card-body p-0">
        <div className="d-flex gap-2 mb-2">
          <img
            src={user}
            alt="Profile photo"
            className="img-fluid rounded-circle"
            style={{ height: "23px" }}
          />
          <p className="card-text fw-light">abc</p>
        </div>
        <p className="card-title fw-bold">{truncatedTitle}</p>
        <p className="card-subtitle text-justify text-secondary">
          {truncatedSubtitle}
        </p>
      </div>
    </NavLink>
  );
}
