import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// Attach JWT token automatically to all requests
API.interceptors.request.use((req) => {
  const authData = localStorage.getItem("rechargex_auth");
  if (authData) {
    try {
      const { token } = JSON.parse(authData);
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Error parsing auth data:", e);
    }
  }
  return req;
});

// Handle response errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth data
      localStorage.removeItem("rechargex_auth");
      // Only redirect if not on login/signup page
      if (!window.location.pathname.includes('login') && !window.location.pathname.includes('signup')) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
