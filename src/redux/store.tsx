import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import userInfoReducer from "./slices/userInfoSlices";

const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
