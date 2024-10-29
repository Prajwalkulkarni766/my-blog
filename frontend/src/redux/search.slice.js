import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  blogs: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchBlogs(state, action) {
      state.blogs = action.payload;
    },
    appendSearchBlogs(state, action) {
      state.blogs = [...state.blogs, action.payload];
    },
    setSearchBlogsPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setSearchBlogs, appendSearchBlogs, setSearchBlogsPage } =
  searchSlice.actions;
export default searchSlice.reducer;
