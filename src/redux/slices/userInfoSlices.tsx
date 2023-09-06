import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupParams } from "../../interfaces/interfaces";

interface UserState {
  users: SignupParams[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserInfoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserInfoSuccess: (state, action: PayloadAction<SignupParams[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUserInfoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserInfoStart,
  fetchUserInfoSuccess,
  fetchUserInfoFailure,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
