import { createSlice } from "@reduxjs/toolkit";

export const TempDatabaseSlice = createSlice({
  name: "TempDatabase",
  initialState: {
    usersDatabase: [],
  },

  reducers: {
    setTempUsersDatabase: (state, action) => {
      state.usersDatabase = action.payload;
    },
  },
});

export const selectTempUsersDatabase = (state) =>
  state.TempDatabase.usersDatabase;

export const { setTempUsersDatabase } = TempDatabaseSlice.actions;
export default TempDatabaseSlice.reducer;
