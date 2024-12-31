import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: {
    foryou: 1,
    following: 1,
    trending: 1,
    readlater: 1,
  },
  blogs: {
    foryou: [],
    following: [],
    trending: [],
    readlater: [],
  },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog(state, action) {
      const { tab, blogs } = action.payload;
      state.blogs[tab] = [...state.blogs[tab], ...blogs];
    },
    setPage(state, action) {
      const { tab, page } = action.payload;
      state.page[tab] = page;
    },
  },
});

export const { setBlog, setPage } = blogSlice.actions;
export default blogSlice.reducer;
