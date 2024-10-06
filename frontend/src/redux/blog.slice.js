import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  blog: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog(state, action) {
      state.blog = [...state.blog, ...action.payload];
    },
    setBlogPage(state, action) {
      state.page = action.payload;
    },
    removeBlog: (state, action) => {
      state.blog = state.blog.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setBlog, removeBlog, setBlogPage } = blogSlice.actions;
export default blogSlice.reducer;
