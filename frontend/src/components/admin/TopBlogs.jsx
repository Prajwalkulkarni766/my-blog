import React, { useState, useEffect } from "react";
import { getTopBlogsReport } from "../../utils/api";

export default function TopBlogs() {
  const [topBlogsData, setTopBlogsData] = useState([]);

  useEffect(() => {
    getTopBlogsReport(setTopBlogsData);
  }, []);

  return (
    <>
      <h2>Top Blogs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Claps</th>
            <th>Comments</th>
            <th>Publish Date</th>
          </tr>
        </thead>
        <tbody>
          {topBlogsData.map((blog, index) => (
            <tr key={index}>
              <td>{blog.title}</td>
              <td>{blog.clap_count}</td>
              <td>{blog.comment_count}</td>
              <td>{blog.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
