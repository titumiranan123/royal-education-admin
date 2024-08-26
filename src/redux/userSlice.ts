/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;

export default authSlice.reducer;

// Middleware to check token validity and refresh if necessary
export const authMiddleware =
  (store: any) => (next: any) => async (action: any) => {
    const state = store.getState();
    const { token } = state.auth;

    if (token) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/refreshtoken",
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.data && data.data.accessToken) {
          store.dispatch(setToken(data.data.accessToken));
        } else {
          store.dispatch(logout());
        }
      } catch (error) {
        store.dispatch(logout());
      }
    }

    return next(action);
  };
