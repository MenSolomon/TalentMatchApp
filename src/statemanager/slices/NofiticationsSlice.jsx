import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const NofiticationsSlice = createSlice({
  name: "Notifications",
  initialState: {
    userNotifications: [],
  },

  reducers: {
    setUserNotifications: (state, action) => {
      state.userNotifications = action.payload;
    },
  },
});

export const selectUserNotifications = (state) =>
  state.Notifications.userNotifications;

export const { setUserNotifications } = NofiticationsSlice.actions;
export default NofiticationsSlice.reducer;
