import axios from "axios";

// Auto-detect environment
const isProduction = import.meta.env.MODE === "production";

const API = axios.create({
  baseURL: isProduction
    ? "https://greenshoes-backend-production.up.railway.app" // PROD
    : "http://localhost:4000", // DEV
  withCredentials: false,
});

// Auto-attach JWT
API.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Standardized error handling (optional but recommended)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API ERROR:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default API;
