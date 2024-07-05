import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  isOpen: boolean;
}

const initialState: InitialStateProps = {
  isOpen: false,
};

const toastSlice = createSlice({
  initialState,
  name: "toast",
  reducers: {
    openAndCloseToast: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
});

export const { openAndCloseToast } = toastSlice.actions;
export default toastSlice.reducer;
