import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInitialStateProps {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  job: string | null;
  photoURL: string | null;
  uid: string | null;
}

const initialState: UserInitialStateProps = {
  firstName: null,
  lastName: null,
  job: null,
  email: null,
  photoURL: null,
  uid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInitialStateProps>) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.job = action.payload.job;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    clearUser: (state) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.job = null;
      state.photoURL = null;
      state.uid = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
