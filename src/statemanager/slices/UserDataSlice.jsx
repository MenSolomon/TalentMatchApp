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
      subscriptionPrice: "",
      paymentType: "",
      paymentDetails: {},
    },
    imageWithMrzFileStore: [],
    blobImageWithMrz: "",
    imageWithoutFileStore: [],
    blobImageWithoutMrz: "",
    productPackage: "",
    selectedProductArray: [],
    selectedBasicProductArray: [],
  },

  reducers: {
    setUserSignUpData: (state, action) => {
      state.userSignUpData = action.payload;
    },
    setImageWithMrzFileStore: (state, action) => {
      state.imageWithMrzFileStore = action.payload;
    },
    setImageWithoutFileStore: (state, action) => {
      state.imageWithoutFileStore = action.payload;
    },
    setBlobImageWithMrz: (state, action) => {
      state.blobImageWithMrz = action.payload;
    },
    setBlobImageWithoutMrz: (state, action) => {
      state.blobImageWithoutMrz = action.payload;
    },
    setSelectedProductArray: (state, action) => {
      state.selectedProductArray = action.payload;
    },
    setSelectedBasicProductArray: (state, action) => {
      state.selectedBasicProductArray = action.payload;
    },
    setProductPackage: (state, action) => {
      state.productPackage = action.payload;
    },
  },
});

export const selectUserSignUpData = (state) => state.UserData.userSignUpData;
export const selectImageWithMrzFileStore = (state) =>
  state.UserData.imageWithMrzFileStore;
export const selectImageWithoutFileStore = (state) =>
  state.UserData.imageWithoutFileStore;
export const selectBlobImageWithMrz = (state) =>
  state.UserData.blobImageWithMrz;
export const selectBlobImageWithoutMrz = (state) =>
  state.UserData.blobImageWithoutMrz;
export const selectSelectedProductArray = (state) =>
  state.UserData.selectedProductArray;
export const selectSelectedBasicProductArray = (state) =>
  state.UserData.selectedBasicProductArray;
export const selectProductPackage = (state) => state.UserData.productPackage;

export const {
  setUserSignUpData,
  setImageWithMrzFileStore,
  setImageWithoutFileStore,
  setBlobImageWithMrz,
  setBlobImageWithoutMrz,
  setProductPackage,
  setSelectedProductArray,
  setSelectedBasicProductArray,
} = UserDataSlice.actions;
export default UserDataSlice.reducer;
