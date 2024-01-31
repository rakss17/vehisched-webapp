import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vehicle } from "../../interfaces/interfaces";

interface UserState {
  data: Vehicle[];
}

const initialState: UserState = {
  data: [],
};

const vehiclesDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchVehiclesData: (state, action: PayloadAction<Vehicle[]>) => {
      state.data = action.payload;
    },
  },
});

export const { fetchVehiclesData } = vehiclesDataSlice.actions;

export default vehiclesDataSlice.reducer;
