import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import toastReducer from "./toastSlice";
import userReducer from "./userSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    toast: toastReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
