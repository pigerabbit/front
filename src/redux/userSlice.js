import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isNoticeExist: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return initialState;
    },
    update: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { login, logout, update } = userSlice.actions;

export default userSlice.reducer;
