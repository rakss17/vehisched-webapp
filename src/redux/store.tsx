import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlices";
import userInfoReducer from "./slices/userInfoSlices";

const userPersistConfig = {
  key: "user",
  storage,
};

const userInfoPersistConfig = {
  key: "userInfo",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedUserInfoReducer = persistReducer(
  userInfoPersistConfig,
  userInfoReducer
);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    userInfo: persistedUserInfoReducer,
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
