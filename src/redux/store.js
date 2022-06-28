import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import confirmationIconReducer from "./confirmationIconSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    confirmationIcon: confirmationIconReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
