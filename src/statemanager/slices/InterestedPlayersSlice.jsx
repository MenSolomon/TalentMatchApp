import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const InterestedPlayersSlice = createSlice({
  name: "InterestedPlayers",
  initialState: {
    interestedPlayers: [],
  },

  reducers: {
    setInterestedPlayers: (state, action) => {
      state.interestedPlayers = action.payload;
    },
  },
});

export const selectInterestedPlayers = (state) =>
  state.InterestedPlayers.interestedPlayers;

export const { setInterestedPlayers } = InterestedPlayersSlice.actions;
export default InterestedPlayersSlice.reducer;
