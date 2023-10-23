import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import incomeReducer from "./slices/incomeSlice";
import playerDetailsCardsCollapseReducer from "./slices/CollapsePlayerDisplayCards";
import ThemeProviderReducer from "./slices/ThemeProviderSlice";
import PlayersInAgencyReducer from "./slices/PlayersInAgencySlice";
import SignupStepperReducer from "./slices/SignupStepperSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["PlayersInAgencySlice", "FormStepper"],
};

const reducer = combineReducers({
  //   files: incomeReducer,
  CollapsePlayerCards: playerDetailsCardsCollapseReducer,
  ThemeProviderSlice: ThemeProviderReducer,
  PlayersInAgencySlice: PlayersInAgencyReducer,
  FormStepper: SignupStepperReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
