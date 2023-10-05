import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupParams } from "../../interfaces/interfaces";

interface UserState {
  data: SignupParams[];
}

const initialState: UserState = {
  data: [],
};

const driversDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDriversData: (state, action: PayloadAction<SignupParams[]>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchDriversData } = driversDataSlice.actions;

export default driversDataSlice.reducer;
