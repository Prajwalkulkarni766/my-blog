import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [
    {
      id: 1,
      cardTitle: "Card title",
      cardText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eaque necessitatibus voluptatibus nesciunt, accusantium libero?",
      readDate: "01-01-2000",
    },
    {
      id: 2,
      cardTitle: "Card title",
      cardText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eaque necessitatibus voluptatibus nesciunt, accusantium libero?",
      readDate: "01-01-2000",
    },
    {
      id: 3,
      cardTitle: "Card title",
      cardText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eaque necessitatibus voluptatibus nesciunt, accusantium libero?",
      readDate: "01-01-2000",
    },
    {
      id: 4,
      cardTitle: "Card title",
      cardText:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque eaque necessitatibus voluptatibus nesciunt, accusantium libero?",
      readDate: "01-01-2000",
    },
  ],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory(state, action) {
      state.history = [...action.payload];
    },
    removeHistory: (state, action) => {
      state.history = state.history.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const { setHistory, removeHistory } = historySlice.actions;
export default historySlice.reducer;
