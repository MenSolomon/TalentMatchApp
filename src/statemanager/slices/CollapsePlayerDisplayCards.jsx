import { createSlice } from "@reduxjs/toolkit";

export const CollapsePlayerCardsSlice = createSlice({
  name: "CollapsePlayerCards",
  initialState: {
    isCollapsed: false,
  },

  reducers: {
    setIsCollapseTrue: (state) => {
      state.isCollapsed = true;
    },

    setIsCollapseFalse: (state) => {
      state.isCollapsed = false;
    },
  },
});

export const selectIsCollapesedVariable = (state) =>
  state.CollapsePlayerCards.isCollapsed;

export const { setIsCollapseFalse, setIsCollapseTrue } =
  CollapsePlayerCardsSlice.actions;
export default CollapsePlayerCardsSlice.reducer;
