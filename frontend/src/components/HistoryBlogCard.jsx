import React from "react";

export default function HistoryBlogCard() {
  return (
    <div className="card text-justify mb-3 position-relative">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text text-truncate">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
        <p className="card-text">
          <small className="text-body-secondary">Read on 05-05-2000</small>
        </p>
        <div className="overlay">
          <button className="remove-btn">Remove</button>
        </div>
      </div>
    </div>
  );
}
