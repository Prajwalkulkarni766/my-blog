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

// this function will clear all history of user
export const clearHistory = async (dispatch) => {
  try {
    const response = await axiosInstance.delete("/v1/history");

    if (response.status === 200) {
      dispatch(clearAllHistory());
      dispatch(setHistoryPage(1));
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function will clear a particular history of user
export const clearParticularHistory = async (dispatch, id) => {
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
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function will help you to change the tab
export const changeTab = (setCurrentTab, tabName) => {
  setCurrentTab(tabName);
};

// this function will fetch blogs i.e. for-you tab from server
export const getRecommendedBlogs = async (dispatch, currentTab, blogPage) => {
  try {
    const response = await axiosInstance.get("/v1/blogs/recommend", {
      params: {
        page: blogPage,
      },
    });

    if (response.status === 200) {
      if (response.data.length > 0) {
        dispatch(setBlog({ tab: "foryou", blogs: response.data }));
        dispatch(setPage({ tab: "foryou", page: blogPage + 1 }));
      }
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function will fetch blogs i.e. following
export const getFollowingBlogs = async (dispatch, currentTab, blogPage) => {
  try {
    const response = await axiosInstance.get("/v1/blogs/following", {
      params: {
        page: blogPage,
      },
    });

    if (response.status === 200) {
      if (response.data.length > 0) {
        dispatch(setBlog({ tab: "following", blogs: response.data }));
        dispatch(setPage({ tab: "following", page: blogPage + 1 }));
      }
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function will fetch blogs i.e. trending
export const getTrendingBlogs = async (dispatch, currentTab, blogPage) => {
  try {
    const response = await axiosInstance.get("/v1/blogs/trending", {
      params: {
        page: blogPage,
      },
    });

    if (response.status === 200) {
      if (response.data.length > 0) {
        dispatch(setBlog({ tab: "trending", blogs: response.data }));
        dispatch(setPage({ tab: "trending", page: blogPage + 1 }));
      }
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function will fetch blogs i.e. read-later
export const getReadLaterBlogs = async (dispatch, currentTab, blogPage) => {
  try {
    const response = await axiosInstance.get("/v1/read_later", {
      params: {
        page: blogPage,
      },
    });

    if (response.status === 200 && response.data.length > 0) {
      dispatch(setBlog({ tab: "readlater", blogs: response.data }));
      dispatch(setPage({ tab: "foryou", page: blogPage + 1 }));
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function will fetch history of user from server
export const getHistory = async (dispatch, historyPage) => {
  try {
    const response = await axiosInstance.get("/v1/history", {
      params: {
        page: historyPage,
      },
    });

    if (response.status === 200 && response.data.length > 0) {
      dispatch(setHistory(response.data));
      dispatch(setHistoryPage(historyPage + 1));
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function will fetch history of user from server
export const getReadLater = async (dispatch, historyPage) => {
  try {
    const response = await axiosInstance.get("/v1/read_later", {
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
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function give a clap for blog
export const handleClap = async (blogId) => {
  try {
    const response = await axiosInstance.post("/v1/claps", {
      blog_id: blogId,
    });

    if (response.status === 200) {
      Toast.success("Given a clap for blog");
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function give a clap for blog
export const handleComment = async (blogId, content) => {
  try {
    const response = await axiosInstance.post("/v1/comments", {
      blog_id: blogId,
      content: content,
    });

    if (response.status === 200) {
      Toast.success("Comment added successfully");
      return response.data;
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function give a clap for blog
export const handleReadLater = async (blogId) => {
  try {
    const response = await axiosInstance.post("/v1/read_later", {
      blog_id: blogId,
    });

    if (response.status === 200) {
      Toast.success("Added to read later");
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function fetch comments according to blog
export const getComments = async (blogId, setComments) => {
  try {
    const response = await axiosInstance.get(`/v1/comments/${blogId}`);

    if (response.status === 200) {
      setComments(response.data == null ? [] : response.data);
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// get blog
export const getBlog = async (blogId, setBlog) => {
  try {
    const response = await axiosInstance.get(`/v1/blogs/${blogId}`);

    if (response.status === 200) {
      const rawContent = JSON.parse(response.data.content);
      response.data.content = draftToHtml(rawContent);
      setBlog(response.data);
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// start following the writer
export const follow = async (followed_user_id, setBlog) => {
  try {
    const response = await axiosInstance.post(`/v1/followers`, {
      followed_id: followed_user_id,
    });

    if (response.status === 200) {
      Toast.success("Successfully started following writer");
      setBlog((prevBlog) => ({
        ...prevBlog,
        is_following: !prevBlog.is_following,
      }));
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// unfollow the writer
export const unfollow = async (followed_user_id, setBlog) => {
  try {
    const response = await axiosInstance.delete(`/v1/followers`, {
      params: {
        followed_id: followed_user_id,
      },
    });

    if (response.status === 200) {
      Toast.success("Successfully unfollowed the writer");
      setBlog((prevBlog) => ({
        ...prevBlog,
        is_following: !prevBlog.is_following,
      }));
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};
