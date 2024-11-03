import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { getSuggestedBlog } from "../../utils/api";

export default function SuggestBlog({ tags }) {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState({ page: 1, limit: 4, tags });

  useEffect(() => {
    getSuggestedBlog(query, setBlogs, setQuery);
  }, [query]);

  return (
    <>
      <hr />
      <h2 className="mt-4 mb-4">Suggested Blogs:</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-2">
        {blogs.map((blog, index) => (
          <BlogCard blog={blog} key={index} />
        ))}
      </div>
      <div className="d-grid">
        <button
          className="btn btn-light mb-4"
          onClick={() =>
            setQuery((prevQuery) => ({
              ...prevQuery,
              page: prevQuery.page + 1,
            }))
          }
        >
          Load more
        </button>
      </div>
    </>
  );
}
