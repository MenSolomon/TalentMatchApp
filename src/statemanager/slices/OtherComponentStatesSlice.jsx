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
    circularLoadBackdropMessage: "Loading",
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
      "Goalkeeper",
      "Defender",
      "Center Back",
      "Right Back",
      "Left Back",
      "Wing Back",
      "Midfielder",
      "Defensive Midfielder",
      "Central Midfielder",
      "Attacking Midfielder",
      "Foward",
      "Winger",
      "Striker",
    ],

    positionsFullObject: [
      { name: "Goalkeeper", code2: "GK", code3: "GKP" },
      { name: "Defender", code2: "DF", code3: "DEF" },
      { name: "Center Back", code2: "CB", code3: "CBK" },
      { name: "Right Back", code2: "RB", code3: "RBK" },
      { name: "Left Back", code2: "LB", code3: "LBK" },
      { name: "Wing Back", code2: "WB", code3: "WBK" },
      { name: "Midfielder", code2: "MF", code3: "MID" },
      { name: "Defensive Midfielder", code2: "DM", code3: "DMF" },
      { name: "Central Midfielder", code2: "CM", code3: "CMF" },
      { name: "Attacking Midfielder", code2: "AM", code3: "AMF" },
      { name: "Forward", code2: "FW", code3: "FWD" },
      { name: "Winger", code2: "WG", code3: "WNG" },
      { name: "Striker", code2: "ST", code3: "STK" },
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
    setCircularLoadBackdropMessage: (state) => {
      state.circularLoadBackdropMessage = action.payload;
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
export const selectCircularLoadBackdropMessage = (state) =>
  state.OtherComponentStates.circularLoadBackdropMessage;
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
export const selectSoccerPositionsFullObject = (state) =>
  state.OtherComponentStates.positionsFullObject;

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
  setCircularLoadBackdropMessage,
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
