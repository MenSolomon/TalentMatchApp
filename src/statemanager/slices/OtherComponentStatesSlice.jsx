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
    contactSupportModalCounter: 0,
    contactSupportModalMessage: "",
    circularLoadBackdropCounter: 0,
    circularLoadBackdropTrigger: false,
    videoBelow15mbSelected: false,
    imageBelow500kbSelected: false,
    currentScreenSize: {
      width: "",
      height: "",
    },
    currentBrowserSize: {
      width: "",
      height: "",
    },
    carouselVideoIndex: 0,
    playerPositions: [
      // "Any",
      "Goalkeeper (GK)",
      "Center Back (CB)",
      "Right Back (RB)",
      "Left Back (LB)",
      "Wing Back (WB) ",
      "Defensive Midfielder (DM)",
      "Central Midfielder (CM)",
      "Attacking Midfielder (AM)",
      "Winger (W)",
      "Striker (ST)",
    ],
    // messaging user selected
    contactSelectedForMessaging: {
      contactId: "",
      name: "",
    },
    // MRZ scanned data
    MrzScanner: {},
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
    setSnackbarTriggerCounterToZero: (state) => {
      state.snackbarTriggerCounter = 0;
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
    setContactSupportModalCounter: (state) => {
      state.contactSupportModalCounter += 1;
    },
    setContactSupportModalMessage: (state, action) => {
      state.contactSupportModalMessage = action.payload;
    },
    setOpenCircularLoadBackdrop: (state) => {
      state.circularLoadBackdropTrigger = true;
    },
    setCloseCircularLoadBackdrop: (state) => {
      state.circularLoadBackdropTrigger = false;
    },
    setVideoBelow15mbSelected: (state, action) => {
      state.videoBelow15mbSelected = action.payload;
    },
    setImageBelow500kbSelected: (state, action) => {
      state.imageBelow500kbSelected = action.payload;
    },
    setCurrentScreenSize: (state, action) => {
      state.currentScreenSize = action.payload;
    },
    setCurrentBrowserSize: (state, action) => {
      state.currentBrowserSize = action.payload;
    },
    setCarouselVideoIndex: (state, action) => {
      state.carouselVideoIndex = action.payload;
    },
    setContactSelectedForMessaging: (state, action) => {
      state.contactSelectedForMessaging = action.payload;
    },
    setMrzScanner: (state, action) => {
      state.MrzScanner = action.payload;
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
export const selectCircularLoadBackdropTriggerState = (state) =>
  state.OtherComponentStates.circularLoadBackdropTrigger;
// export const selectCircularLoadBackdropCounter = (state) =>
//   state.OtherComponentStates.circularLoadBackdropCounter;
export const selectVideoBelow15mbSelected = (state) =>
  state.OtherComponentStates.videoBelow15mbSelected;
export const selectImageBelow500kbSelected = (state) =>
  state.OtherComponentStates.imageBelow500kbSelected;
export const selectCurrentScreenSize = (state) =>
  state.OtherComponentStates.currentScreenSize;

export const selectCurrentBrowserSize = (state) =>
  state.OtherComponentStates.currentBrowserSize;

export const selectContactSupportModalCounter = (state) =>
  state.OtherComponentStates.contactSupportModalCounter;
export const selectContactSupportModalMessage = (state) =>
  state.OtherComponentStates.contactSupportModalMessage;
export const selectCarouselVideoIndex = (state) =>
  state.OtherComponentStates.carouselVideoIndex;
export const selectSoccerPostions = (state) =>
  state.OtherComponentStates.playerPositions;

export const selectContactSelectedForMessaging = (state) =>
  state.OtherComponentStates.contactSelectedForMessaging;

export const selectMrzScanner = (state) =>
  state.OtherComponentStates.MrzScanner;

export const {
  setAutoCompletePlayerPosition,
  setFilterModalType,
  setEditFilterModalButtonClicked,
  setSnackbarTriggerCounter,
  setSnackbarTriggerCounterToZero,
  setSnackbarMessage,
  setWarningAlertModalMessage,
  setWarningAlertModalCounter,
  setVideoBelow15mbSelected,
  setImageBelow500kbSelected,
  setCurrentScreenSize,
  setOpenCircularLoadBackdrop,
  setCloseCircularLoadBackdrop,
  setContactSupportModalCounter,
  setContactSupportModalMessage,
  setCurrentBrowserSize,
  setCarouselVideoIndex,
  setContactSelectedForMessaging,
  setMrzScanner,
} = OtherComponentStatesSlice.actions;
export default OtherComponentStatesSlice.reducer;
