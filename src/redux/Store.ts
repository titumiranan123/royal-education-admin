

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializability check
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
