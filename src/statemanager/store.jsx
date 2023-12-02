import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { createTransform, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import incomeReducer from "./slices/incomeSlice";
import playerDetailsCardsCollapseReducer from "./slices/CollapsePlayerDisplayCards";
import ThemeProviderReducer from "./slices/ThemeProviderSlice";
import PlayersInAgencyReducer from "./slices/PlayersInAgencySlice";
import SignupStepperReducer from "./slices/SignupStepperSlice";
import UserDaterReducer from "./slices/UserDataSlice";
import TempDatabaseReducer from "./slices/TempDatabaseSlice";
import LoginUserDataSlice from "./slices/LoginUserDataSlice";
import SavedProfilesReducer from "./slices/SavedProfileSlice";
import OtherComponentStatesReducer from "./slices/OtherComponentStatesSlice";
import DatabaseReducer from "./slices/DatabaseSlice";
import ClubsInDatabaseReducer from "./slices/ClubsInDatabaseSlice";
import InternetActivitieReducer from "./slices/InternetActivitiesSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    // selectedPlayerToCompareArray make selected player in the playersInAgenySlice not persisted
    // "PlayersInAgencySlice",
    "FormStepper",
    "UserData",
    // "UserLoginData",
    "SavedProfiles",
    "OtherComponentStates",
    // "Database",
    // "ThemeProviderSlice",
    "TempDatabase",
  ],
};

const PlayersInAgencySlicePersistConfig = {
  key: "PlayersInAgencySlice",
  version: 1,
  storage,
  blacklist: [
    "selectedPlayerToCompareArray",
    "playerObjectSampleWithoutBasicInformation",
  ],
  whitelist: [
    "playersInAgencyArray",
    "playerSelectedByClubOrScoutInPlayerManagement",
  ],
};

const reducer = combineReducers({
  //   files: incomeReducer,
  CollapsePlayerCards: playerDetailsCardsCollapseReducer,
  ThemeProviderSlice: ThemeProviderReducer,
  PlayersInAgencySlice: persistReducer(
    PlayersInAgencySlicePersistConfig,
    PlayersInAgencyReducer
  ),
  FormStepper: SignupStepperReducer,
  UserData: UserDaterReducer,
  TempDatabase: TempDatabaseReducer,
  UserLoginData: LoginUserDataSlice,
  SavedProfiles: SavedProfilesReducer,
  OtherComponentStates: OtherComponentStatesReducer,
  Database: DatabaseReducer,
  clubsInTalentMeetDatabase: ClubsInDatabaseReducer,
  InternetActivities: InternetActivitieReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
