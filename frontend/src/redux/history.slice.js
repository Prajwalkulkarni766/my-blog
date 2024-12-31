import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  history: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory(state, action) {
      state.history = [...state.history, ...action.payload];
    },
    setHistoryPage(state, action) {
      state.page = action.payload;
    },
    removeHistoryItem: (state, action) => {
      state.history = state.history.filter(
        (item) => item.id !== action.payload,
      );
    },
    clearAllHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  setHistory,
  setHistoryPage,
  removeHistoryItem,
  clearAllHistory,
} = historySlice.actions;
export default historySlice.reducer;
