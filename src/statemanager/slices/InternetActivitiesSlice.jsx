import { createSlice } from "@reduxjs/toolkit";

export const InternetActivitiesSlice = createSlice({
  name: "InternetActivities",
  initialState: {
    InternetConnectionStatus: true,
  },

  reducers: {
    setInternetConnectionOnline: (state) => {
      state.InternetConnectionStatus = true;
    },
    setInternetConnectionOffline: (state) => {
      state.InternetConnectionStatus = false;
    },
  },
});

export const selectInternetConnectionStatus = (state) =>
  state.InternetActivities.InternetConnectionStatus;

export const { setInternetConnectionOffline, setInternetConnectionOnline } =
  InternetActivitiesSlice.actions;
export default InternetActivitiesSlice.reducer;
