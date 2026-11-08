import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "https://phc-backend-v9mb.onrender.com/api/v1").replace(/\/$/, "");

export const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("carepulse_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("carepulse_token");
      sessionStorage.removeItem("carepulse_user");
      if (!window.location.pathname.startsWith("/login")) window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(error) {
  return error.response?.data?.message || error.response?.data?.msg || error.message || "Something went wrong.";
}
