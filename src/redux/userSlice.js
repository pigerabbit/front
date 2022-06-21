import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return { user: action.payload };
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
