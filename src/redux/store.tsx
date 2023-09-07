import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlices";
import userInfoReducer from "./slices/userInfoSlices";

// Create the persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Wrap the reducers with the persist reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedUserInfoReducer = persistReducer(persistConfig, userInfoReducer);

// Configure the store with the persisted reducers
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    userInfo: persistedUserInfoReducer,
  },
});

// Create the persistor
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
