import axios from "axios";
import { toast } from "react-toastify";
import { getAuthStatus } from "../utils/authUtils";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // Ensures cookies (refresh token) are sent
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isLoggedIn = getAuthStatus();

    // Check for 401 (Unauthorized) error & prevent infinite loops
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log(isLoggedIn, "hello");
      originalRequest._retry = true;
      if (isLoggedIn) {
        localStorage.setItem("isLoggedIn", "false");
        toast.error("Session expired. Please log in again.");
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
