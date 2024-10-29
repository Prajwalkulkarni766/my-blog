import React, { useEffect } from "react";
import BlogList from "../components/BlogList.jsx";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { searchBlog } from "../utils/api.js";
import { setSearchBlogs, appendSearchBlogs } from "../redux/search.slice.js";

export default function Search() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.search.blogs);
  const searchPage = useSelector((state) => state.search.page);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h4>Search result : </h4>
        <div className="container" style={{ maxWidth: "810px" }}>
          <BlogList
            blogs={blogs}
            title="Search Blog"
            loadMore={() => {
              searchBlog(searchPage, appendSearchBlogs, dispatch);
            }}
            noContentMessage="No search result found"
          />
        </div>
      </div>
    </>
  );
}
