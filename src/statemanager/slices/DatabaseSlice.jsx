import { createSlice } from "@reduxjs/toolkit";

export const DatabaseSlice = createSlice({
  name: "Database",
  initialState: {
    usersDatabase: [],
    playersDatabase: [],
    ApiPlayersDatabase: [],
  },

  reducers: {
    setUsersDatabase: (state, action) => {
      state.usersDatabase = action.payload;
    },
    setPlayersDatabase: (state, action) => {
      state.playersDatabase = action.payload;
    },
    setApiPlayersDatabase: (state, action) => {
      state.ApiPlayersDatabase = action.payload;
    },
  },
});

export const selectUsersDatabase = (state) => state.Database.usersDatabase;
export const selectPlayersDatabase = (state) => state.Database.playersDatabase;
export const selectApiPlayersDatabase = (state) =>
  state.Database.ApiPlayersDatabase;

export const { setUsersDatabase, setPlayersDatabase, setApiPlayersDatabase } =
  DatabaseSlice.actions;
export default DatabaseSlice.reducer;
