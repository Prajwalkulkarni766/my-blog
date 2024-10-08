import React, { useState, useEffect } from "react";
import CustomBadge from "../components/CustomBadge";
import BlogPostCard from "../components/BlogPostCard";
import BlogList from "../components/BlogList.jsx";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  clearHistory,
  clearParticularHistory,
  getBlogs,
  getHistory,
  changeTab,
} from "../utils/api.js";

import History from "../components/History.jsx";

export default function Home() {
  // states that holds history and blogs info
  const history = useSelector((state) => state.history.history);
  const foryouBlogs = useSelector((state) => state.blog.blogs["foryou"]);
  const followingBlogs = useSelector((state) => state.blog.blogs["following"]);
  const trendingBlogs = useSelector((state) => state.blog.blogs["trending"]);
  const readlaterBlogs = useSelector((state) => state.blog.blogs["readlater"]);

  // states that holds from which page to which page you have to fetch data
  let historyPage = useSelector((state) => state.history.page);
  let forYouPage = useSelector((state) => state.blog.page["foryou"]);
  let followingPage = useSelector((state) => state.blog.page["following"]);
  let trendingPage = useSelector((state) => state.blog.page["trending"]);
  let readLaterPage = useSelector((state) => state.blog.page["readlater"]);

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("foryou");

  useEffect(() => {
    if (currentTab === "foryou" && foryouBlogs.length <= 0) {
      getBlogs(dispatch, "foryou", forYouPage);
    } else if (currentTab === "following" && followingBlogs.length <= 0) {
      getBlogs(dispatch, "following", followingPage);
    } else if (currentTab === "trending" && trendingBlogs.length <= 0) {
      getBlogs(dispatch, "trending", trendingPage);
    } else if (currentTab === "readlater" && readlaterBlogs.length <= 0) {
      getBlogs(dispatch, "readlater", readLaterPage);
    }
    if (history.length <= 0) {
      getHistory(dispatch, historyPage);
    }
  }, [currentTab, dispatch]);

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
                onClick={() => clearHistory(dispatch)}
              >
                Clear All
              </h6>
            </div>
            {/* showing history */}
            <History
              history={history}
              clearParticularHistory={clearParticularHistory}
              getHistory={getHistory}
              dispatch={dispatch}
              historyPage={historyPage}
            />
          </div>
          <div className="col-lg-8 col-md-12">
            <ul className="nav gap-3">
              {["foryou", "following", "trending", "readlater"].map((tab) => (
                <CustomBadge
                  key={tab}
                  content={tab.charAt(0).toUpperCase() + tab.slice(1)}
                  isActive={currentTab === tab}
                  onClick={() => changeTab(setCurrentTab, tab)}
                />
              ))}
            </ul>

            {/* Use BlogList component for different tabs */}
            {currentTab === "foryou" && (
              <BlogList
                blogs={foryouBlogs}
                title="For You"
                loadMore={() => getBlogs(dispatch, "foryou", forYouPage)}
                noContentMessage="Please do some activities so we can suggest you blogs"
              />
            )}
            {currentTab === "following" && (
              <BlogList
                blogs={followingBlogs}
                title="Following"
                loadMore={() => getBlogs(dispatch, "following", followingPage)}
                noContentMessage="You are following no one"
              />
            )}
            {currentTab === "trending" && (
              <BlogList
                blogs={trendingBlogs}
                title="Trending"
                loadMore={() => getBlogs(dispatch, "trending", trendingPage)}
                noContentMessage="There is no blog in trending"
              />
            )}
            {currentTab === "readlater" && (
              <BlogList
                blogs={readlaterBlogs}
                title="Read Later"
                loadMore={() => getBlogs(dispatch, "readlater", readLaterPage)}
                noContentMessage="You have no blogs saved for later"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
