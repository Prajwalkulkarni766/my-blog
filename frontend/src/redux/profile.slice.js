import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  emailAddress: "",
  password: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileInfo: (state, action) => {
      return {
        ...state,
        userName: action.payload.userName,
        emailAddress: action.payload.emailAddress,
        password: action.payload.password,
      };
    },
  },
});

export const { setProfileInfo } = profileSlice.actions;
export default profileSlice.reducer;
