import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  step: 1,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + state.step;
    },
    decrement: (state) => {
      state.count = state.count - state.step;
    },
    setStep: (state, action) => {
      state.step = Number(action.payload);
    },
  },
});

export const { increment, decrement, setStep } = counterSlice.actions;
export default counterSlice.reducer;
