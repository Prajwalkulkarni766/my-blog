import React, { useState, useEffect } from "react";
import TopBlogs from "../../components/admin/TopBlogs";
import AdminNavbar from "../../components/admin/AdminNavbar";
import LineChart from "../../components/admin/LineChart";
import { getClapCommentTrends } from "../../utils/api";

export default function BlogReport() {
  const [clapCommentData, setClapCommentData] = useState({
    labels: [],
    datasets: [],
  });

  const blogEngagementOverTimeData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Engagement",
        data: [50, 150, 100, 200, 300],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  useEffect(() => {
    getClapCommentTrends(setClapCommentData);
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container my-container mt-5">
        <TopBlogs />

        <div className="mt-5"></div>
        <h2>Blog Engagement Over Time</h2>
        <LineChart data={blogEngagementOverTimeData} />
        <div className="mt-5"></div>
        <h2>Clap and Comment Trends</h2>
        <LineChart data={clapCommentData} />
      </div>
    </>
  );
}
