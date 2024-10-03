import React, { useState } from "react";
import CustomBadge from "../components/CustomBadge";
import BlogPostCard from "../components/BlogPostCard";
import HistoryBlogCard from "../components/HistoryBlogCard";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setHistory, removeHistory } from "../redux/history.slice.js";

export default function Home() {
  const history = useSelector((state) => state.history.history);
  const blogs = useSelector((state) => state.blog.blog);
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("foryou");

  const clearAllHistory = () => {
    dispatch(setHistory([]));
  };

  const clearParticularBlog = (id) => {
    const newHistory = history.filter((card) => card.id !== id);
    dispatch(setHistory(newHistory));
  };

  const changeTab = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-4 d-none d-lg-block">
            <h1>Hello Ram !</h1>
            &nbsp;
            <h4>Welcome back ...</h4>
            &nbsp; &nbsp;
            <div className="d-flex">
              <h6>History</h6>
              <h6
                className="text-danger ms-auto cursor-pointer"
                onClick={clearAllHistory}
              >
                Clear All
              </h6>
            </div>
            {/* showing history */}
            {history.length == 0 ? (
              <p className="text-center mt-3">No History available</p>
            ) : (
              <div
                className="custom-scrollbar p-2"
                style={{ maxHeight: "60vh", overflowY: "scroll" }}
              >
                {history.map((card) => (
                  <HistoryBlogCard
                    key={card.id}
                    cardTitle={card.cardTitle}
                    cardText={card.cardText}
                    readDate={card.readDate}
                    onClick={() => clearParticularBlog(card.id)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="col-lg-8 col-md-12">
            <ul className="nav gap-3">
              <CustomBadge
                content={"For You"}
                isActive={currentTab === "foryou"}
                onClick={() => changeTab("foryou")}
              />
              <CustomBadge
                content={"Following"}
                isActive={currentTab === "following"}
                onClick={() => changeTab("following")}
              />
              <CustomBadge
                content={"Trending"}
                isActive={currentTab === "trending"}
                onClick={() => changeTab("trending")}
              />

              <div
                className="custom-scrollbar p-2"
                style={{ maxHeight: "76vh", overflowY: "scroll" }}
              >
                {/* showing blogs */}
                {blogs.map((blog) => (
                  <BlogPostCard
                    key={blog.id}
                    cardTitle={blog.cardTitle}
                    cardText={blog.cardText}
                    cardImage={blog.cardImage}
                    postDate={blog.postDate}
                  />
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
