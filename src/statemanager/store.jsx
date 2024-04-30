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
import NofiticationsReducer from "./slices/NofiticationsSlice";
import MessagesReducer from "./slices/MessagesSlice";
import VideosReducer from "./slices/VideosSlice";
import InterestedPlayersReducer from "./slices/InterestedPlayersSlice";
import InterestedConnectionReducer from "./slices/InterestedConnectionSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [
    "CollapsePlayerCards",
    "ThemeProviderSlice",
    "PlayersInAgencySlice",
    "FormStepper",
    "TempDatabase",
    "UserData",
    // "UserLoginData",
    "SavedProfiles",
    "OtherComponentStates",
    "Database",
    "clubsInTalentMeetDatabase",
    "InternetActivities",
    "Notifications",
    "Messages",
    "Videos",
    "InterestedPlayers",
    "InterestedConnections",
  ],
  // whitelist:
};

const PlayersInAgencySlicePersistConfig = {
  key: "PlayersInAgencySlice",
  version: 1,
  storage,
  blacklist: [
    "selectedPlayerToCompareArray",
    "playerObjectSampleWithoutBasicInformation",
    "PlayerSelectedToView",
  ],
  whitelist: [
    "playersInAgencyArray",
    "playerSelectedByClubOrScoutInPlayerManagement",
  ],
};

const SavedProfilesSlicePersistConfig = {
  key: "SavedProfiles",
  version: 1,
  storage,
  blacklist: [
    "currentProfileFilterObject",
    "currentProfile",
    "previousProfile",
  ],
  whitelist: ["userSavedProfiles"],
};

const UserLoginDataSlicePersistConfig = {
  key: "UserLoginData",
  version: 1,
  storage,
  blacklist: ["logInStatus", "userDetailsObject", "credentials"],
  whitelist: [
    "subscriptionFeatures",
    "isSubscriptionActive",
    "selectSubscriptionFeatures",
    "selectBoostPoints",
  ],
};

const OtherComponentStatesPersistConfig = {
  key: "OtherComponentStates",
  version: 1,
  storage,
  whitelist: ["selectCircularLoadBackdropMessage"],
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
  UserLoginData: persistReducer(
    UserLoginDataSlicePersistConfig,
    LoginUserDataSlice
  ),
  SavedProfiles: persistReducer(
    SavedProfilesSlicePersistConfig,
    SavedProfilesReducer
  ),
  OtherComponentStates: persistReducer(
    OtherComponentStatesPersistConfig,
    OtherComponentStatesReducer
  ),
  Database: DatabaseReducer,
  clubsInTalentMeetDatabase: ClubsInDatabaseReducer,
  InternetActivities: InternetActivitieReducer,
  Notifications: NofiticationsReducer,
  Messages: MessagesReducer,
  Videos: VideosReducer,
  InterestedPlayers: InterestedPlayersReducer,
  InterestedConnections: InterestedConnectionReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
