import { createSlice } from "@reduxjs/toolkit";

export const SignupStepperSlice = createSlice({
  name: "FormStepper",
  initialState: {
    completedSteps: {},
    roleSelected: "",
    packageSelected: "",
    productID: "",
    priceID: "",
    userForm: {},
  },

  reducers: {
    setCompletedSteps: (state, action) => {
      state.completedSteps = action.payload;
    },
    setRoleSelected: (state, action) => {
      state.roleSelected = action.payload;
    },
    setProductID: (state, action) => {
      state.productID = action.payload;
    },
    setPriceID: (state, action) => {
      state.priceID = action.payload;
    },
  },
});

export const selectCompleteSteps = (state) => state.FormStepper.completedSteps;
export const selectRoleSelected = (state) => state.FormStepper.roleSelected;
export const selectProductID = (state) => state.FormStepper.productID;
export const selectPriceID = (state) => state.FormStepper.priceID;

export const { setCompletedSteps, setRoleSelected, setProductID, setPriceID } =
  SignupStepperSlice.actions;
export default SignupStepperSlice.reducer;
