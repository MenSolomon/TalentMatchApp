import { createSlice } from "@reduxjs/toolkit";

export const ThemeProviderSlice = createSlice({
  name: "ThemeProviderSlice",
  initialState: {
    ThemeProviderObject: {
      background: "#f7f7f9",
      buttonColor: "#5585FE",
      cardBackground: "white",
      primaryTextColor: "black",
      secondaryTextColor: "black",
    },
  },
  // #152558
  reducers: {
    setThemeProviderToDarkMode: (state) => {
      state.ThemeProviderObject = {
        background: "#09142D",
        cardBackground: "#141C3F",
        buttonColor: "#E4E8F9",
        primaryTextColor: "#E4E8F9",
        secondaryTextColor: "#9FA4B1",
      };
    },
    setThemeProviderToLightMode: (state) => {
      state.ThemeProviderObject = {
        background: "#f7f7f9",
        buttonColor: "#5585FE",
        cardBackground: "white",
        primaryTextColor: "black",
        secondaryTextColor: "black",
      };
    },
  },
});

export const selectThemeProviderObject = (state) =>
  state.ThemeProviderSlice.ThemeProviderObject;

export const { setThemeProviderToDarkMode, setThemeProviderToLightMode } =
  ThemeProviderSlice.actions;
export default ThemeProviderSlice.reducer;
