import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const VideosSlice = createSlice({
  name: "Videos",
  initialState: {
    allVideos: [],
  },

  reducers: {
    setAllPlayersVideos: (state, action) => {
      state.allVideos = action.payload;
    },
  },
});

export const selectAllPlayersVideos = (state) => state.Videos.allVideos;

export const { setAllPlayersVideos } = VideosSlice.actions;
export default VideosSlice.reducer;
