import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersInfoReducer from "./slices/usersInfoSlices";
import personalInfoReducer from "./slices/personalInfoSlices";
import vehiclesDataReducer from "./slices/vehiclesDataSlices";
import driversDataReducer from "./slices/driversDataSlices";

const usersInfoPersistConfig = {
  key: "user",
  storage,
};

const personalInfoPersistConfig = {
  key: "personalInfo",
  storage,
};

const vehiclesDataPersistConfig = {
  key: "vehiclesData",
  storage,
};
const driversDataPersistConfig = {
  key: "driversData",
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

const persistedVehiclesDataReducer = persistReducer(
  vehiclesDataPersistConfig,
  vehiclesDataReducer
);
const persistedDriversDataReducer = persistReducer(
  driversDataPersistConfig,
  driversDataReducer
);

const store = configureStore({
  reducer: {
    usersInfo: persistedUsersInfoReducer,
    personalInfo: persistedPersonalInfoReducer,
    vehiclesData: persistedVehiclesDataReducer,
    driversData: persistedDriversDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
