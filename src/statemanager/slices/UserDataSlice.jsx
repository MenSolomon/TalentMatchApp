import { createSlice } from "@reduxjs/toolkit";

export const UserDataSlice = createSlice({
  name: "UserData",
  initialState: {
    userSignUpData: {
      firstname: "",
      surname: "",
      DateOfBirth: "",
      organization: "",
      phoneNumber: "",
      email: "",
      Nationality: "",
      DOB: "",
      password: "",
      subscriptionPackage: "",
      paymentType: "",
      paymentDetails: {},
    },
  },

  reducers: {
    setUserSignUpData: (state, action) => {
      state.userSignUpData = action.payload;
    },
  },
});

export const selectUserSignUpData = (state) => state.UserData.userSignUpData;

export const { setUserSignUpData } = UserDataSlice.actions;
export default UserDataSlice.reducer;
