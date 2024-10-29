import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../redux/auth.slice.js";
import loadingReducer from "../redux/loading.slice.js";
import historyReducer from "../redux/history.slice.js";
import blogReducer from "../redux/blog.slice.js";
import profileReducer from "../redux/profile.slice.js";
import searchReducer from "../redux/search.slice.js";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    loading: loadingReducer,
    history: historyReducer,
    blog: blogReducer,
    profile: profileReducer,
    search: searchReducer,
  },
});
