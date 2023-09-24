// import { createSlice } from "@reduxjs/toolkit";

// export const incomeSlice = createSlice({
//   name: "files",
//   initialState: {
//     allFiles: [],
//     nonDuplicateFiles: [],
//     historOfNonDuplicatedFiles: [],
//     uploadedFiles: [],
//     selectedFilesToDelete: [],
//   },

//   reducers: {
//     getallFiles: (state, action) => {
//       state.allFiles = action.payload;
//     },

//     getnonDuplicateFiles: (state, action) => {
//       state.nonDuplicateFiles = action.payload;
//     },

//     gethistoryOfNonDuplicateFiles: (state, action) => {
//       state.historOfNonDuplicatedFiles = action.payload;
//     },
//     getuploadedFiles: (state, action) => {
//       state.uploadedFiles = action.payload;
//     },
//     getselectedFilesToDelete: (state, action) => {
//       state.selectedFilesToDelete = action.payload;
//     },
//   },
// });

// export const selectallFiles = (state) => state.files.allFiles;
// export const selectallNonDuplicateFiles = (state) =>
//   state.files.nonDuplicateFiles;
// export const selectallHistoryOfNonDuplicateFiles = (state) =>
//   state.files.historOfNonDuplicatedFiles;
// export const selectuploadedFiles = (state) => state.files.uploadedFiles;
// export const selectFilesToDelete = (state) => state.files.selectedFilesToDelete;
// export const {
//   getnonDuplicateFiles,
//   getallFiles,
//   gethistoryOfNonDuplicateFiles,
//   getuploadedFiles,
//   getselectedFilesToDelete,
// } = incomeSlice.actions;
// export default incomeSlice.reducer;
