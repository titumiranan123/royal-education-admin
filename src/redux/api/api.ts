import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Ensure consistent capitalization
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response, // Handle successful response
  async (error) => {
    const originalRequest = error.config;

    // If 401 error occurs, attempt to refresh the token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const { data } = await api.post("/api/v1/refreshtoken");
        Cookies.set("accessToken", data.accessToken, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        console.log("Token refreshed");

        // Update original request with new access token and retry
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // Handle refresh token failure
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken"); // Optional, depending on your token management
        window.location.href = "/"; // Redirect to login page
        return Promise.reject(err);
      }
    }

    // Return any other errors that were not handled
    return Promise.reject(error);
  }
);

export default api;
