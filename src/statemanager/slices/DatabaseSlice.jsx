import { createSlice } from "@reduxjs/toolkit";

export const DatabaseSlice = createSlice({
  name: "Database",
  initialState: {
    usersDatabase: [],
  },

  reducers: {
    setUsersDatabase: (state, action) => {
      state.usersDatabase = action.payload;
    },
  },
});

export const selectUsersDatabase = (state) => state.Database.usersDatabase;

export const { setUsersDatabase } = DatabaseSlice.actions;
export default DatabaseSlice.reducer;
