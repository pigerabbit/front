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
    init: (state, action) => {
      return initialState;
    },
  },
});

export const { setBest, init } = productsSlice.actions;

export default productsSlice.reducer;
