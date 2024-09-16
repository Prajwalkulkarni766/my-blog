import React, { useEffect } from "react";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import readLater from "../assets/readLater.svg";
import share from "../assets/share.svg";
import listen from "../assets/listen.svg";

export default function BlogPostButtons() {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
    );
  }, []);

  return (
    <div className="d-flex">
      <div className="me-auto">
        {/* like button */}
        <button
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Like"
        >
          <img src={like} alt="like logo" title="Like" />
        </button>

        {/* comment button */}
        <button
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Comment"
        >
          <img src={comment} alt="comment logo" />
        </button>
      </div>

      <div className="ms-auto">
        {/* save to read later button */}
        <button
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Read Later"
        >
          <img src={readLater} alt="Read later logo" />
        </button>

        {/* share button */}
        <button
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Share"
        >
          <img src={share} alt="Share logo" />
        </button>

        {/* listen button */}
        <button
          className="btn"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Listen"
        >
          <img src={listen} alt="Listen logo" />
        </button>
      </div>
    </div>
  );
}
