import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const SavedProfileSlice = createSlice({
  name: "SavedProfiles",
  initialState: {
    savedProfilesArray: [],
  },

  reducers: {
    setSavedProfiles: (state, action) => {
      state.savedProfilesArray = action.payload;
    },
  },
});

export const selectUserSignUpData = (state) =>
  state.SavedProfiles.savedProfilesArray;

export const { setSavedProfiles } = SavedProfileSlice.actions;
export default SavedProfileSlice.reducer;
