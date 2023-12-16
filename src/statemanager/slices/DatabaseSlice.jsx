import { createSlice } from "@reduxjs/toolkit";

export const DatabaseSlice = createSlice({
  name: "Database",
  initialState: {
    usersDatabase: [],
    playersDatabase: [],
  },

  reducers: {
    setUsersDatabase: (state, action) => {
      state.usersDatabase = action.payload;
    },
    setPlayersDatabase: (state, action) => {
      state.playersDatabase = action.payload;
    },
  },
});

export const selectUsersDatabase = (state) => state.Database.usersDatabase;
export const selectPlayersDatabase = (state) => state.Database.playersDatabase;

export const { setUsersDatabase, setPlayersDatabase } = DatabaseSlice.actions;
export default DatabaseSlice.reducer;
