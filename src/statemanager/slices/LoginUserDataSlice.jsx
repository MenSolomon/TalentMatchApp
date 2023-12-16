import { createSlice } from "@reduxjs/toolkit";

export const UserLoginDataSlice = createSlice({
  name: "UserLoginData",
  initialState: {
    logInStatus: false,
    userDetailsObject: {},
  },

  reducers: {
    setLoginStatus: (state, action) => {
      state.logInStatus = action.payload;
    },
    setUserDetailsObject: (state, action) => {
      state.userDetailsObject = action.payload;
    },
  },
});

export const selectLoginStatus = (state) => state.UserLoginData.logInStatus;

export const selectUserDetailsObject = (state) =>
  state.UserLoginData.userDetailsObject;

export const { setLoginStatus, setUserDetailsObject } =
  UserLoginDataSlice.actions;
export default UserLoginDataSlice.reducer;
