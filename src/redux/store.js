import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import confirmationIconReducer from "./confirmationIconSlice";
import groupsReducer from "./groupsSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    confirmationIcon: confirmationIconReducer,
    groups: groupsReducer,
    products: productsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
