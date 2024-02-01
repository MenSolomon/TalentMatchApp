import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const SavedProfileSlice = createSlice({
  name: "SavedProfiles",
  initialState: {
    currentProfile: "",
    userSavedProfiles: [],
    currentProfileFilterObject: {
      PlaceOfBirth: "Any",
      NationalityValue: "Any",
      AgeRangeValue: [0, 40],
      HeightRangeValue: [0, 2.5],
      positionRangeSliderValues: {
        "Clean sheet": [0, 100],
        Saves: [0, 100],
        "Long pass accuracy": [0, 100],
        Interception: [0, 100],

        Blocks: [0, 100],
        "Successful tackles rate %": [0, 100],
        "pass success": [0, 100],
        "total passes": [0, 100],
        assists: [0, 100],

        Goals: [0, 100],
        "Goal/match played ratio": [0, 100],
        Assists: [0, 100],
        // "Shots per game": [0, 100],
      },
      MarketValue: "0 - 99,999",

      SalaryExpectationValue: "0 - 4,999",

      ClubCountryValue: "Any",
      // CaptainRadioValue: "Any",
      PrefferedFootRadioValue: "Any",
      PlayerDivisionValue: "Any",
      ContractStatusCheckBoxes: "Any",

      // REview below
      PlayerPositionAutoCompleteValue: "Any",
      PlayerAlternatePositionAutoCompleteValue: "None",
    },
    previousProfile: "",
  },

  reducers: {
    setUserSavedProfiles: (state, action) => {
      state.userSavedProfiles = action.payload;
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    setCurrentProfileFilterObject: (state, action) => {
      state.currentProfileFilterObject = action.payload;
    },
    setPreviousProfile: (state, action) => {
      state.previousProfile = action.payload;
    },
  },
});

export const selectUserSavedProfiles = (state) =>
  state.SavedProfiles.userSavedProfiles;
export const selectCurrentProfile = (state) =>
  state.SavedProfiles.currentProfile;
export const selectCurrentProfileFilterObject = (state) =>
  state.SavedProfiles.currentProfileFilterObject;
export const selectPreviousProfile = (state) =>
  state.SavedProfiles.previousProfile;

export const {
  setUserSavedProfiles,
  setCurrentProfile,
  setCurrentProfileFilterObject,
  setPreviousProfile,
} = SavedProfileSlice.actions;
export default SavedProfileSlice.reducer;
