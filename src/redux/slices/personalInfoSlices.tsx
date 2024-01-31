import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupParams } from "../../interfaces/interfaces";

interface UserState {
  data: SignupParams | null;
}

const initialState: UserState = {
  data: null,
};

const personalInfoSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchPersonalInfo: (state, action: PayloadAction<SignupParams>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchPersonalInfo } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
