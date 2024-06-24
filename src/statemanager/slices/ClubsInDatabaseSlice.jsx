import { createSlice } from "@reduxjs/toolkit";

export const ClubsInDatabaseSlice = createSlice({
  name: "clubsInTalentMeetDatabase",
  initialState: {
    clubsInDatabase: [],
  },

  reducers: {
    setClubsInDatabase: (state, action) => {
      state.clubsInDatabase = action.payload;
    },
  },
});

export const selectClubsInDatabase = (state) =>
  state.clubsInTalentMeetDatabase.clubsInDatabase;

export const { setClubsInDatabase } = ClubsInDatabaseSlice.actions;
export default ClubsInDatabaseSlice.reducer;
