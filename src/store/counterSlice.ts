import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface representing the state of the counter.
 * @interface
 * @property {number} value - The current value of the counter.
 */
export interface CounterState {
  value: number;
}

/**
 * The initial state of the counter.
 */
const initialState: CounterState = {
  value: 0,
};

/**
 * Redux slice for managing the counter state.
 * @module counterSlice
 */
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    /**
     * Increments the counter value by 1.
     * @function
     * @param {CounterState} state - The current state of the counter.
     */
    increment: (state: CounterState) => {
      state.value += 1;
    },
    /**
     * Decrements the counter value by 1.
     * @function
     * @param {CounterState} state - The current state of the counter.
     */
    decrement: (state: CounterState) => {
      state.value -= 1;
    },
    /**
     * Increments the counter value by a specified amount.
     * @function
     * @param {CounterState} state - The current state of the counter.
     * @param {PayloadAction<number>} action - The action payload containing the amount to increment by.
     */
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Export actions and reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
