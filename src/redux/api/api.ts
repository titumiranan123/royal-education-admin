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
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/api/v1/refreshtoken");
        Cookies.set("accessToken", data.accessToken, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
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
