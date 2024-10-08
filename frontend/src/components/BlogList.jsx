import React from "react";
import BlogPostCard from "./BlogPostCard";

export default function BlogList({ blogs, title, loadMore, noContentMessage }) {
  return (
    <div
      className="custom-scrollbar p-2"
      style={{ maxHeight: "76vh", overflowY: "scroll" }}
    >
      {blogs.length > 0 ? (
        <>
          {blogs.map((blog, index) => (
            <BlogPostCard
              key={index}
              cardId={blog.id}
              cardTitle={blog.title}
              cardText={blog.sub_title}
              cardImage={blog.cardImage}
              postDate={blog.created_at}
              clapCount={blog.clap_count}
              commentCount={blog.comment_count}
            />
          ))}
          <div className="d-grid">
            <button className="btn btn-light" onClick={loadMore}>
              Load more
            </button>
          </div>
        </>
      ) : (
        <p className="text-center">{noContentMessage}</p>
      )}
    </div>
  );
}
