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
    imageWithMrzFileStoreForAccountVerification: [],

    blobImageWithMrz: "",
    imageWithoutFileStore: [],
    blobImageWithoutMrz: "",
    blobImageWithMrzForAccountVerification: "",
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

    setImageWithMrzFileStoreForAccountVerification: (state, action) => {
      state.imageWithMrzFileStoreForAccountVerification = action.payload;
    },

    setImageWithoutFileStore: (state, action) => {
      state.imageWithoutFileStore = action.payload;
    },
    setBlobImageWithMrz: (state, action) => {
      state.blobImageWithMrz = action.payload;
    },
    setBlobImageWithMrzForAccountVerification: (state, action) => {
      state.blobImageWithMrzForAccountVerification = action.payload;
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
export const selectImageWithMrzFileStoreForAccountVerification = (state) =>
  state.UserData.imageWithMrzFileStoreForAccountVerification;
export const selectImageWithoutFileStore = (state) =>
  state.UserData.imageWithoutFileStore;
export const selectBlobImageWithMrz = (state) =>
  state.UserData.blobImageWithMrz;
export const selectBlobImageWithMrzForAccountVerification = (state) =>
  state.UserData.blobImageWithMrzForAccountVerification;
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
  setImageWithMrzFileStoreForAccountVerification,
  setBlobImageWithMrzForAccountVerification,
  setSelectedBasicProductArray,
} = UserDataSlice.actions;
export default UserDataSlice.reducer;
