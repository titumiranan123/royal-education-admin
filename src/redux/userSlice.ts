/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decode } from "jwt-js-decode";
import Cookies from "js-cookie";
import api from "./api/api";

// Define User and Auth State interface
interface AuthState {
  user: any ;
  isAuthenticated: boolean;
 isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
isLoading: true,
  error: null,
};

// Async thunk for login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Make API request
      const response = await api.post("/api/v1/admin/login", credentials);
      // Extract access token from response
      const accessToken = response.data.data.token;
      // Store access token in cookies
      Cookies.set("accessToken", accessToken);
      const decodedToken: any = decode(accessToken);
      return { user: decodedToken.payload, accessToken };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Create the slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("accessToken");
      window.location.href='/'
    },
    setAuth(state, action: PayloadAction<{ user: any; accessToken: string }>) {
      const { user, accessToken } = action.payload;
      state.user = user.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      Cookies.set("accessToken", accessToken);
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logout, clearAuth, setAuth } = authSlice.actions;
export default authSlice.reducer;
