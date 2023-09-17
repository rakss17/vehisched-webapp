import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupParams } from "../../interfaces/interfaces";

interface UserState {
  data: SignupParams[];
}

const initialState: UserState = {
  data: [],
};

const usersInfoSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchUsersInfo: (state, action: PayloadAction<SignupParams[]>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchUsersInfo } = usersInfoSlice.actions;

export default usersInfoSlice.reducer;
