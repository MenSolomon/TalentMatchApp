import { createSlice } from "@reduxjs/toolkit";

export const OtherComponentStatesSlice = createSlice({
  name: "OtherComponentStates",
  initialState: {
    autoCompletePlayerPosition: "",
    filterModalType: "",
    editFilterModalButtonClicked: 0,
    snackbarTriggerCounter: 0,
    snackbarMessage: "",
    warningAlertModalCounter: 0,
    warningAlertModalMessage: "",
  },

  reducers: {
    setAutoCompletePlayerPosition: (state, action) => {
      state.autoCompletePlayerPosition = action.payload;
    },
    setFilterModalType: (state, action) => {
      state.filterModalType = action.payload;
    },
    setEditFilterModalButtonClicked: (state) => {
      state.editFilterModalButtonClicked += 1;
    },
    setSnackbarTriggerCounter: (state) => {
      state.snackbarTriggerCounter += 1;
    },
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
    setWarningAlertModalCounter: (state) => {
      state.warningAlertModalCounter += 1;
    },
    setWarningAlertModalMessage: (state, action) => {
      state.warningAlertModalMessage = action.payload;
    },
  },
});

export const selectAutoCompletePlayerPosition = (state) =>
  state.OtherComponentStates.autoCompletePlayerPosition;
export const selectFilterModalType = (state) =>
  state.OtherComponentStates.filterModalType;
export const selectEditFilterModalButtonClicked = (state) =>
  state.OtherComponentStates.editFilterModalButtonClicked;
export const selectSnackbarTriggerCounter = (state) =>
  state.OtherComponentStates.snackbarTriggerCounter;
export const selectSnackbarMessage = (state) =>
  state.OtherComponentStates.snackbarMessage;
export const selectWarningAlertModalCounter = (state) =>
  state.OtherComponentStates.warningAlertModalCounter;
export const selectWarningAlertModalMessage = (state) =>
  state.OtherComponentStates.warningAlertModalMessage;

export const {
  setAutoCompletePlayerPosition,
  setFilterModalType,
  setEditFilterModalButtonClicked,
  setSnackbarTriggerCounter,
  setSnackbarMessage,
  setWarningAlertModalMessage,
  setWarningAlertModalCounter,
} = OtherComponentStatesSlice.actions;
export default OtherComponentStatesSlice.reducer;
