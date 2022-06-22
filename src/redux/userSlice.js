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
    confirmNotice: (state, action) => {
      return { user: { ...state.user, alertsExist: false } };
    },
  },
});

export const { login, logout, update, confirmNotice } = userSlice.actions;

export default userSlice.reducer;
