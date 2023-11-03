import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const SavedProfileSlice = createSlice({
  name: "SavedProfiles",
  initialState: {
    currentProfile: "",
  },

  reducers: {
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
  },
});

export const selectCurrentProfile = (state) =>
  state.SavedProfiles.currentProfile;

export const { setCurrentProfile } = SavedProfileSlice.actions;
export default SavedProfileSlice.reducer;
