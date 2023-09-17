import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersInfoReducer from "./slices/usersInfoSlices";
import personalInfoReducer from "./slices/personalInfoSlices";

const usersInfoPersistConfig = {
  key: "user",
  storage,
};

const personalInfoPersistConfig = {
  key: "personalInfo",
  storage,
};

const persistedUsersInfoReducer = persistReducer(
  usersInfoPersistConfig,
  usersInfoReducer
);
const persistedPersonalInfoReducer = persistReducer(
  personalInfoPersistConfig,
  personalInfoReducer
);

const store = configureStore({
  reducer: {
    usersInfo: persistedUsersInfoReducer,
    personalInfo: persistedPersonalInfoReducer,
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
