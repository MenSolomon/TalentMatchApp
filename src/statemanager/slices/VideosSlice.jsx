import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const VideosSlice = createSlice({
  name: "Videos",
  initialState: {
    allVideos: [],
    randomizedVideos: [],
  },

  reducers: {
    setAllPlayersVideos: (state, action) => {
      state.allVideos = action.payload;
    },
    setRandomizedVideosArray: (state, action) => {
      state.randomizedVideos = action.payload;
    },
  },
});

export const selectAllPlayersVideos = (state) => state.Videos.allVideos;
export const selectRandomizedVideosArray = (state) =>
  state.Videos.randomizedVideos;

export const { setAllPlayersVideos, setRandomizedVideosArray } =
  VideosSlice.actions;
export default VideosSlice.reducer;
