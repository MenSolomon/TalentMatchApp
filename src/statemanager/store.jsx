import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import incomeReducer from "./slices/incomeSlice";
import playerDetailsCardsCollapseReducer from "./slices/CollapsePlayerDisplayCards";
import ThemeProviderReducer from "./slices/ThemeProviderSlice";
import PlayersInAgencyReducer from "./slices/PlayersInAgencySlice";
import SignupStepperReducer from "./slices/SignupStepperSlice";
import UserDaterReducer from "./slices/UserDataSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["PlayersInAgencySlice", "FormStepper", "UserData"],
};

const reducer = combineReducers({
  //   files: incomeReducer,
  CollapsePlayerCards: playerDetailsCardsCollapseReducer,
  ThemeProviderSlice: ThemeProviderReducer,
  PlayersInAgencySlice: PlayersInAgencyReducer,
  FormStepper: SignupStepperReducer,
  UserData: UserDaterReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
