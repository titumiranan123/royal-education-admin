import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./quizSlice";
import authSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    quiz: quizSlice,
    user: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
