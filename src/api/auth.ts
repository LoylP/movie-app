import axios from "axios";
import Cookies from "js-cookie"; // Assume you're using a library like js-cookie

// Utility function to validate JWT token
const isTokenValid = (token: string | undefined): boolean => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
  timeout: 10000, // Set a timeout (e.g., 10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Replace with your cookie key
    if (isTokenValid(token)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("Invalid or expired token. Please log in again.");
      // Optionally handle logout or token refresh logic here
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Token may be expired or invalid.");
      // Optionally handle token refresh or user logout here
    }
    return Promise.reject(error);
  }
);

// Example GET request
export const getCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/users/me");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null
    }
  };
  