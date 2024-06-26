import { createSlice } from "@reduxjs/toolkit";

export const UserLoginDataSlice = createSlice({
  name: "UserLoginData",
  initialState: {
    logInStatus: false,
    userDetailsObject: {},
    // credentials: "",
    isSubscriptionActive: true,
    nextBillingDate: "N/A",
    subscriptionFeatures: {},
  },

  reducers: {
    setLoginStatus: (state, action) => {
      state.logInStatus = action.payload;
    },
    setUserDetailsObject: (state, action) => {
      state.userDetailsObject = action.payload;
    },
    // setCredentials: (state, action) => {
    //   state.credentials = action.payload;
    // },
    setIsSubscriptionActive: (state, action) => {
      state.isSubscriptionActive = action.payload;
    },
    setNextBillingDate: (state, action) => {
      state.nextBillingDate = action.payload;
    },
    setSubscriptionFeatures: (state, action) => {
      state.subscriptionFeatures = action.payload;
    },
  },
});

export const selectLoginStatus = (state) => state.UserLoginData.logInStatus;

export const selectUserDetailsObject = (state) =>
  state.UserLoginData.userDetailsObject;

// export const selectCredentials = (state) => state.UserLoginData.credentials;

export const selectIsSubscriptionActive = (state) =>
  state.UserLoginData.isSubscriptionActive;

export const selectSubscriptionFeatures = (state) =>
  state.UserLoginData.subscriptionFeatures;

export const selectNextBillingDate = (state) =>
  state.UserLoginData.nextBillingDate;

export const {
  setLoginStatus,
  setUserDetailsObject,
  setCredentials,
  setIsSubscriptionActive,
  setSubscriptionFeatures,
  setNextBillingDate,
} = UserLoginDataSlice.actions;
export default UserLoginDataSlice.reducer;
