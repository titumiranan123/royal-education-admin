/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decode, verify } from "jwt-js-decode";
import Cookies from "js-cookie";

// Define the state interface
interface AuthState {
  user: any | null; // You can replace `any` with the actual user type if known
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      verify(action.payload.token, initialState.token as string)
        .then((res) => {
          if (res === true) {
            const jwt = decode(action.payload.token);
            state.token = action.payload.token;
            state.user = jwt.payload;
            state.isAuthenticated = true;

            Cookies.set("token", state.token);
          } else {
            state.error = "Token verification failed";
          }
        })
        .catch((error) => {
          state.error = error.message || "Token verification failed";
        });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      Cookies.remove("token");
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    refreshToken: async (state) => {
      const accessToken = state.token;
      if (!accessToken) {
        state.error = "No access token available";
        return;
      }

      const decodedToken = decode(state.token as string);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        state.isAuthenticated = false;
        state.error = "Token has expired, logging out.";
        state.token = null;
        state.user = null;
        Cookies.remove("token");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/refreshtoken",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          state.token = data.token;
          Cookies.set("token", state.token as string);
        } else {
          state.error = data.message || "Token refresh failed";
          state.isAuthenticated = false;
        }
      } catch (error: any) {
        state.error = error.response
          ? error.response.data
          : "Token refresh failed";
        state.isAuthenticated = false;
      }
    },
  },
});

export const { login, logout, setUser, refreshToken } = authSlice.actions;

export default authSlice.reducer;

// Middleware to check token validity and refresh if necessary
// export const authMiddleware =
//   (store: any) => (next: any) => async (action: any) => {
//     const state = store.getState();
//     const { token } = state.auth;

//     if (token) {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/api/v1/refreshtoken",
//           {
//             method: "POST",
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();

//         if (data.data && data.data.accessToken) {
//           store.dispatch(setToken(data.data.accessToken));
//         } else {
//           store.dispatch(logout());
//         }
//       } catch (error) {
//         store.dispatch(logout());
//       }
//     }

//     return next(action);
//   };
