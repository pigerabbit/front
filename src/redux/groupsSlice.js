import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendationGroups: [],
  nearbyGroups: [],
  personNearGroups: [],
  timeNearGroups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setRecommendation: (state, action) => {
      return { ...state, recommendationGroups: action.payload };
    },
    setNearby: (state, action) => {
      return { ...state, nearbyGroups: action.payload };
    },
    setPersonNear: (state, action) => {
      return { ...state, personNearGroups: action.payload };
    },
    setTimeNear: (state, action) => {
      return { ...state, timeNearGroups: action.payload };
    },
  },
});

export const { setRecommendation, setNearby, setPersonNear, setTimeNear } =
  groupsSlice.actions;

export default groupsSlice.reducer;
