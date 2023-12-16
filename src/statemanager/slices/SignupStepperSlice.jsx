import { createSlice } from "@reduxjs/toolkit";

export const SignupStepperSlice = createSlice({
  name: "FormStepper",
  initialState: {
    completedSteps: {},
    roleSelected: "",
    packageSelected: "",
    userForm: {},
  },

  reducers: {
    setCompletedSteps: (state, action) => {
      state.completedSteps = action.payload;
    },
    setRoleSelected: (state, action) => {
      state.roleSelected = action.payload;
    },
  },
});

export const selectCompleteSteps = (state) => state.FormStepper.completedSteps;
export const selectRoleSelected = (state) => state.FormStepper.roleSelected;

export const { setCompletedSteps, setRoleSelected } =
  SignupStepperSlice.actions;
export default SignupStepperSlice.reducer;
