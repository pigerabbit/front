import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bestProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setBest: (state, action) => {
      return { ...state, bestProducts: action.payload };
    },
  },
});

export const { setBest } = productsSlice.actions;

export default productsSlice.reducer;
