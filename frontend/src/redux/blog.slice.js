import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: [
    {
      id: 1,
      cardTitle: "Card title 1",
      cardText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eaque necessitatibus voluptatibus nesciunt, accusantium libero?",
      cardImage:
        "https://miro.medium.com/v2/resize:fill:200:134/1*13kgJmkYl5cFKHcycSfxLw.jpeg",
      postDate: "01-01-2000",
    },
    {
      id: 2,
      cardTitle: "Card title 2",
      cardText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eaque necessitatibus voluptatibus nesciunt, accusantium libero?",
      cardImage:
        "https://miro.medium.com/v2/resize:fill:200:134/1*13kgJmkYl5cFKHcycSfxLw.jpeg",
      postDate: "01-01-2000",
    },
    {
      id: 3,
      cardTitle: "Card title 3",
      cardText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eaque necessitatibus voluptatibus nesciunt, accusantium libero?",
      cardImage:
        "https://miro.medium.com/v2/resize:fill:200:134/1*13kgJmkYl5cFKHcycSfxLw.jpeg",
      postDate: "01-01-2000",
    },
  ],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog(state, action) {
      state.blog = [...action.payload];
    },
    removeBlog: (state, action) => {
      state.blog = state.blog.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
