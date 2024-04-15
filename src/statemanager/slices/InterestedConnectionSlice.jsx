import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const InterestedConnectionSlice = createSlice({
  name: "InterestedConnections",
  initialState: {
    InterestedConnectionsArray: [],
  },

  reducers: {
    setInterestedConnections: (state, action) => {
      state.InterestedConnectionsArray = action.payload;
    },
  },
});

export const selectInterestedConnections = (state) =>
  state.InterestedConnections.InterestedConnectionsArray;

export const { setInterestedConnections } = InterestedConnectionSlice.actions;
export default InterestedConnectionSlice.reducer;
