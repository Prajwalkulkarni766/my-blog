import React from "react";

export default function CommentCard({ userName, date, comment }) {
  return (
    <div className="shadow-none pt-3 px-3 pb-1 mb-3 bg-secondary-subtle rounded">
      <div className="d-flex flex-column mb-1">
        <span className="fw-bold">{userName}</span>
        <span className="fw-light">{date}</span>
      </div>
      <p>{comment}</p>
    </div>
  );
}
