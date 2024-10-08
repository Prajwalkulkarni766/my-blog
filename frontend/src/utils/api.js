import axiosInstance from "../axios/axiosInstance";
import Toast from "../helper/Toast.js";
import {
  clearAllHistory,
  setHistoryPage,
  setHistory,
  removeHistoryItem,
} from "../redux/history.slice.js";
import { setBlog, setPage } from "../redux/blog.slice.js";

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
export const getBlogs = async (dispatch, currentTab, blogPage) => {
  try {
    const response = await axiosInstance.get("/v1/blogs", {
      params: {
        page: blogPage,
      },
    });

    if (response.status === 200) {
      if (currentTab === "foryou") {
        dispatch(setBlog({ tab: "foryou", blogs: response.data }));
        dispatch(setPage({ tab: "foryou", page: blogPage + 1 }));
      } else if (currentTab === "following") {
        dispatch(setBlog({ tab: "following", blogs: [] }));
        dispatch(setPage({ tab: "following", page: blogPage + 1 }));
      } else if (currentTab === "trending") {
        dispatch(setBlog({ tab: "trending", blogs: [] }));
        dispatch(setPage({ tab: "trending", page: blogPage + 1 }));
      } else if (currentTab === "readlater") {
        dispatch(setBlog({ tab: "readlater", blogs: [] }));
        dispatch(setPage({ tab: "foryou", page: blogPage + 1 }));
      }
    } else {
      throw new Error("Unexpected status code received");
    }
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.message || "An error occurred.";
    Toast.error(errorMessage);
  }
};

// this function will fetch blogs i.e. following
// this function will fetch blogs i.e. trending
// this function will fetch blogs i.e. read-later

// this function will fetch history of user from server
export const getHistory = async (dispatch, historyPage) => {
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
      // console.log(response.data);
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
export const handleShare = async (blogId) => {};

// this function give a clap for blog
export const handleListen = () => {};

// this function give a clap for blog
export const handleReadLater = async (blogId) => {
  try {
    const response = await axiosInstance.post("/v1/read_later", {
      blog_id: blogId,
    });

    if (response.status === 200) {
      // console.log(response.data);
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

export const getBlog = async (blogId, setBlog) => {
  try {
    const response = await axiosInstance.get(`/v1/blogs/${blogId}`);

    if (response.status === 200) {
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
