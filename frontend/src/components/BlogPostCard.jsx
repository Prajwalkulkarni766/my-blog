import React from "react";
import BlogPostButtons from "./BlogPostButtons";

export default function BlogPostCard() {
  return (
    <>
      <div className="card mb-3 shadow-sm p-3 mb-2 bg-body-tertiary rounded">
        <div className="row g-0">
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">Posted on Apr 10</small>
              </p>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <img
              src="https://miro.medium.com/v2/resize:fill:200:134/1*13kgJmkYl5cFKHcycSfxLw.jpeg"
              className="img-fluid rounded"
              alt="abc"
            />
          </div>
        </div>
        <div className="card-footer bg-transparent ">
          <BlogPostButtons />
        </div>
      </div>
    </>
  );
}
