import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  backgroundColor: "",
  color: "",
  icon: "",
  text: "",
};

export const confirmationIconSlice = createSlice({
  name: "confirmationIcon",
  initialState,
  reducers: {
    show: (state, action) => {
      return {
        show: true,
        backgroundColor: action.payload.backgroundColor,
        color: action.payload.color,
        icon: action.payload.icon,
        text: action.payload.text,
      };
    },
    unshow: (state, action) => {
      return initialState;
    },
  },
});

export const { show, unshow } = confirmationIconSlice.actions;

export default confirmationIconSlice.reducer;
