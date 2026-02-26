import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add global response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is network related or a 5xx server error
    if (!error.response) {
      toast.error("Network error! Please check your connection.");
    } else if (error.response.status >= 500) {
      toast.error("Server error! Our team has been notified.");
    }
    return Promise.reject(error);
  }
);

export default API;