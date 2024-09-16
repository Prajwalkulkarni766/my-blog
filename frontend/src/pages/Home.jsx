import React from "react";
import CustomBadge from "../components/CustomBadge";
import BlogPostCard from "../components/BlogPostCard";
import HistoryBlogCard from "../components/HistoryBlogCard";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4 d-none d-lg-block">
            <h1>Hello Ram !</h1>
            &nbsp;
            <h4>Welcome back ...</h4>
            &nbsp; &nbsp;
            <div className="d-flex ">
              <h6>History</h6>
              <h6 className="text-danger ms-auto cursor-pointer">Clear All</h6>
            </div>
            <div
              className="custom-scrollbar p-2"
              style={{ maxHeight: "60vh", overflowY: "scroll" }}
            >
              <HistoryBlogCard />
              <HistoryBlogCard />
              <HistoryBlogCard />
              <HistoryBlogCard />
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <ul className="nav gap-3">
              <CustomBadge content={"For You"} isActive={true} />
              <CustomBadge content={"Following"} isActive={false} />
              <CustomBadge content={"Treading"} isActive={false} />

              <div
                className="custom-scrollbar p-2"
                style={{ maxHeight: "76vh", overflowY: "scroll" }}
              >
                <BlogPostCard />
                <BlogPostCard />
                <BlogPostCard />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
