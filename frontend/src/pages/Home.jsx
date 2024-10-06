import React, { useState, useEffect } from "react";
import CustomBadge from "../components/CustomBadge";
import BlogPostCard from "../components/BlogPostCard";
import HistoryBlogCard from "../components/HistoryBlogCard";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  setHistory,
  setHistoryPage,
  removeHistoryItem,
  clearAllHistory,
} from "../redux/history.slice.js";
import { setBlog, setBlogPage } from "../redux/blog.slice.js";
import axiosInstance from "../axios/axiosInstance.js";
import Toast from "../helper/Toast.js";

export default function Home() {
  // states that holds history and blogs info
  const history = useSelector((state) => state.history.history);
  const blogs = useSelector((state) => state.blog.blog);

  // states that holds from which page to which page you have to fetch data
  let historyPage = useSelector((state) => state.history.page);
  let blogPage = useSelector((state) => state.blog.page);

  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("foryou");

  // this function will clear all history of user
  const clearHistory = async () => {
    try {
      const response = await axiosInstance.delete("/v1/history");

      if (response.status === 200) {
        dispatch(clearAllHistory());
        dispatch(setHistoryPage(1));
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  // this function will clear a particular history of user
  const clearParticularBlog = async (id) => {
    try {
      const response = await axiosInstance.delete("/v1/history", {
        params: {
          id: id,
        },
      });

      if (response.status === 200) {
        dispatch(removeHistoryItem(id));
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  // this function will help you to change the tab
  const changeTab = (tabName) => {
    setCurrentTab(tabName);
  };

  // this function will fetch blogs for user from server
  const getBlogs = async () => {
    try {
      const response = await axiosInstance.get("/v1/blogs", {
        params: {
          page: blogPage,
        },
      });

      if (response.status === 200) {
        dispatch(setBlog(response.data));
        dispatch(setBlogPage(blogPage + 1));
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  // this function will fetch history of user from server
  const getHistory = async () => {
    try {
      const response = await axiosInstance.get("/v1/history", {
        params: {
          page: historyPage,
        },
      });

      if (response.status === 200) {
        dispatch(setHistory(response.data));
        dispatch(setHistoryPage(historyPage + 1));
      } else {
        throw new Error("Unexpected status code received");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      Toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (blogs.length <= 0) {
      getBlogs();
    }
    // if (history.length <= 0) {
    //   dispatch(setHistoryPage(0));
    //   getHistory();
    // }
  }, []);

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
                onClick={clearHistory}
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
                {history.map((histroyCard, index) => (
                  <HistoryBlogCard
                    key={index}
                    cardTitle={histroyCard.blog_title}
                    cardText={histroyCard.blog_sub_title}
                    readDate={histroyCard.created_at}
                    onClick={() => clearParticularBlog(histroyCard.id)}
                  />
                ))}
                <div className="d-grid">
                  <button className="btn btn-light" onClick={getHistory}>
                    Load more
                  </button>
                </div>
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
                {blogs.map((blog, index) => (
                  <BlogPostCard
                    key={index}
                    cardTitle={blog.title}
                    cardText={blog.sub_title}
                    cardImage={blog.cardImage}
                    postDate={blog.created_at}
                  />
                ))}

                <div className="d-grid">
                  <button className="btn btn-light" onClick={getBlogs}>
                    Load more
                  </button>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
