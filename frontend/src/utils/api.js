import axiosInstance from "../axios/axiosInstance";
import Toast from "../helper/Toast.js";
import {
  clearAllHistory,
  setHistoryPage,
  setHistory,
  removeHistoryItem,
} from "../redux/history.slice.js";
import { setBlog, setPage } from "../redux/blog.slice.js";
import draftToHtml from "draftjs-to-html";
import { setSearchBlogsPage } from "../redux/search.slice.js";
import ApiCall from "./apiCall.js";

// this function will clear all history of user
export const clearHistory = async (dispatch) => {
  await ApiCall(async () => {
    const response = await axiosInstance.delete("/v1/history");
    if (response.status === 200) {
      dispatch(clearAllHistory());
      dispatch(setHistoryPage(1));
    }
  });
};

// this function will clear a particular history of user
export const clearParticularHistory = async (dispatch, id) => {
  await ApiCall(async () => {
    const response = await axiosInstance.delete("/v1/history", {
      params: { id },
    });
    if (response.status === 200) {
      dispatch(removeHistoryItem(id));
    }
  });
};

// this function will help you to change the tab
export const changeTab = (setCurrentTab, tabName) => {
  setCurrentTab(tabName);
};

// this function will fetch blogs i.e. for-you tab from server
export const getRecommendedBlogs = async (dispatch, currentTab, blogPage) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get("/v1/blogs/recommend", {
      params: { page: blogPage },
    });
    if (response.data.length > 0) {
      dispatch(setBlog({ tab: "foryou", blogs: response.data }));
      dispatch(setPage({ tab: "foryou", page: blogPage + 1 }));
    }
  });
};

// this function will fetch blogs i.e. following
export const getFollowingBlogs = async (dispatch, currentTab, blogPage) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get("/v1/blogs/following", {
      params: { page: blogPage },
    });
    if (response.data.length > 0) {
      dispatch(setBlog({ tab: "following", blogs: response.data }));
      dispatch(setPage({ tab: "following", page: blogPage + 1 }));
    }
  });
};

// this function will fetch blogs i.e. trending
export const getTrendingBlogs = async (dispatch, currentTab, blogPage) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get("/v1/blogs/trending", {
      params: { page: blogPage },
    });
    if (response.data.length > 0) {
      dispatch(setBlog({ tab: "trending", blogs: response.data }));
      dispatch(setPage({ tab: "trending", page: blogPage + 1 }));
    }
  });
};

// this function will fetch blogs i.e. read-later
export const getReadLaterBlogs = async (dispatch, currentTab, blogPage) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get("/v1/read_later", {
      params: { page: blogPage },
    });
    if (response.data.length > 0) {
      dispatch(setBlog({ tab: "readlater", blogs: response.data }));
      dispatch(setPage({ tab: "readlater", page: blogPage + 1 }));
    }
  });
};

// this function will fetch history of user from server
export const getHistory = async (dispatch, historyPage) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get("/v1/history", {
      params: { page: historyPage },
    });
    if (response.data.length > 0) {
      dispatch(setHistory(response.data));
      dispatch(setHistoryPage(historyPage + 1));
    }
  });
};

// this function will fetch history of user from server
export const getReadLater = async (dispatch, readLaterPage) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get("/v1/read_later", {
      params: { page: readLaterPage },
    });
    if (response.data.length > 0) {
      dispatch(setHistory(response.data));
      dispatch(setHistoryPage(readLaterPage + 1));
    }
  });
};

// this function give a clap for blog
export const handleClap = async (blogId) => {
  await ApiCall(async () => {
    const response = await axiosInstance.post("/v1/claps", {
      blog_id: blogId,
    });
    Toast.success("Given a clap for blog");
  });
};

// this function give a clap for blog
export const handleComment = async (blogId, content) => {
  await ApiCall(async () => {
    const response = await axiosInstance.post("/v1/comments", {
      blog_id: blogId,
      content: content,
    });
    Toast.success("Comment added successfully");
    return response.data;
  });
};

// this function give a clap for blog
export const handleReadLater = async (blogId) => {
  await ApiCall(async () => {
    const response = await axiosInstance.post("/v1/read_later", {
      blog_id: blogId,
    });
    Toast.success("Added to read later");
  });
};

// this function fetch comments according to blog
export const getComments = async (blogId, setComments) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get(`/v1/comments/${blogId}`);
    setComments(response.data == null ? [] : response.data);
  });
};

// get blog
export const getBlog = async (blogId, setBlog) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get(`/v1/blogs/${blogId}`);
    const rawContent = JSON.parse(response.data.content);
    response.data.content = draftToHtml(rawContent);
    setBlog(response.data);
  });
};

// follow the writer
export const follow = async (followed_user_id, setBlog) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get(`/v1/followers`, {
      followed_id: followed_user_id,
    });
    Toast.success("Successfully started following writer");
    setBlog((prevBlog) => ({
      ...prevBlog,
      is_following: !prevBlog.is_following,
    }));
  });
};

// unfollow the writer
export const unfollow = async (followed_user_id, setBlog) => {
  await ApiCall(async () => {
    const response = await axiosInstance.delete(`/v1/followers`, {
      params: {
        followed_id: followed_user_id,
      },
    });
    Toast.success("Successfully unfollowed the writer");
    setBlog((prevBlog) => ({
      ...prevBlog,
      is_following: !prevBlog.is_following,
    }));
  });
};

// search blog
export const searchBlog = async (searchPage, setData, dispatch) => {
  await ApiCall(async () => {
    const urlObj = new URL(window.location.href);
    const searchTerm = urlObj.searchParams.get("searchTerm");
    const response = await axiosInstance.get(`/v1/blogs/search`, {
      params: {
        page: searchPage,
        queryString: searchTerm,
      },
    });
    if (response.data.length > 0) {
      dispatch(setData(response.data));
      dispatch(setSearchBlogsPage(searchPage + 1));
    } else {
      dispatch(setData(response.data));
    }
  });
};

// get top blogs
export const getTopBlogs = async (setData) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get(`/v1/blogs/search`);
    if (response.data.length > 0) {
      setData(response.data);
    }
  });
};

// get clap and comment trends
export const getClapCommentTrends = async (setData) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get(`/v1/reports/clap-comment`);
    if (response.data.length > 0) {
      const labelData = response.data.map((data) => data.date);
      const clapData = response.data.map((data) => data.clap_count);
      const commentData = response.data.map((data) => data.comment_count);
      setData({
        labels: labelData,
        datasets: [
          {
            label: "Claps",
            data: clapData,
            fill: false,
            backgroundColor: "rgba(255, 206, 86, 0.6)",
            borderColor: "rgba(255, 206, 86, 1)",
          },
          {
            label: "Comments",
            data: commentData,
            fill: false,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
        ],
      });
    }
  });
};

// get daily, weekly, monthly
export const getRegistrationCount = async (reportType, setData) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get(
      `/v1/reports/${reportType}-registrations`,
    );
    if (response.data.length > 0) {
      const labels = response.data.map((data) => data.label);
      const datasets = response.data.map((data) => data.dataset);
      setData({
        labels: labels,
        datasets: [
          {
            label: `New Users (${reportType.charAt(0).toUpperCase() + reportType.slice(1)})`,
            data: datasets,
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.1,
          },
        ],
      });
    }
  });
};

// get top blogs
export const getTopBlogsReport = async (setData) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get(`/v1/reports/top-blogs`);
    if (response.data.length > 0) {
      setData(response.data);
    }
  });
};

// get suggested blog
export const getSuggestedBlog = async (query, setBlogs, setQuery) => {
  await ApiCall(async () => {
    const response = await axiosInstance.get(`/v1/blogs/suggest`, {
      params: query,
    });
    if (response.data.length > 0) {
      setBlogs((prevBlogs) => [...prevBlogs, ...response.data]);
      setQuery((prevQuery) => ({ ...prevQuery, page: prevQuery.page + 1 }));
    }
  });
};
