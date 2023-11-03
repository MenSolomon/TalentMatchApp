import { createSlice } from "@reduxjs/toolkit";

export const OtherComponentStatesSlice = createSlice({
  name: "OtherComponentStates",
  initialState: {
    autoCompletePlayerPosition: "",
  },

  reducers: {
    setAutoCompletePlayerPosition: (state, action) => {
      state.autoCompletePlayerPosition = action.payload;
    },
  },
});

export const selectAutoCompletePlayerPosition = (state) =>
  state.OtherComponentStates.autoCompletePlayerPosition;

export const { setAutoCompletePlayerPosition } =
  OtherComponentStatesSlice.actions;
export default OtherComponentStatesSlice.reducer;
