import React from "react";

export default function HistoryBlogCard({
  cardTitle,
  cardText,
  readDate,
  onClick,
}) {
  return (
    <div className="card text-justify mb-3 position-relative">
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text text-truncate">{cardText}</p>
        <p className="card-text">
          <small className="text-body-secondary">Read on {readDate}</small>
        </p>
        <div className="overlay">
          <button className="remove-btn" onClick={onClick}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
