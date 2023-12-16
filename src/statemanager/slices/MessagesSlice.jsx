import { createSlice } from "@reduxjs/toolkit";
// {profileName:""}
export const MessagesSlice = createSlice({
  name: "Messages",
  initialState: {
    userMessages: [],
  },

  reducers: {
    setuserMessages: (state, action) => {
      state.userMessages = action.payload;
    },
  },
});

export const selectuserMessages = (state) => state.Messages.userMessages;

export const { setuserMessages } = MessagesSlice.actions;
export default MessagesSlice.reducer;
