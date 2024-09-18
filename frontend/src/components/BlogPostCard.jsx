import React from "react";
import BlogPostButtons from "./BlogPostButtons";
import { NavLink } from "react-router-dom";

export default function BlogPostCard({
  cardTitle,
  cardText,
  cardImage,
  postDate,
}) {
  return (
    <>
      <div className="card mb-3 shadow-sm p-3 mb-2 bg-body-tertiary rounded">
        <NavLink
          className="row g-0 cursor-pointer text-decoration-none text-body"
          to={"/blog"}
        >
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{cardTitle}</h5>
              <p className="card-text">{cardText}</p>
              <p className="card-text">
                <small className="text-body-secondary">Posted {postDate}</small>
              </p>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <img src={cardImage} className="img-fluid rounded" alt="abc" />
          </div>
        </NavLink>
        <div className="card-footer bg-transparent ">
          <BlogPostButtons />
        </div>
      </div>
    </>
  );
}
