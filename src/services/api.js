import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// This interceptor is the crucial part. It runs before every single request.
api.interceptors.request.use(
  (config) => {
    // 1. It looks for 'schoolhelp_user' in localStorage.
    const userString = localStorage.getItem("schoolhelp_user");
    if (userString) {
      // 2. If it finds it, it parses the JSON.
      const user = JSON.parse(userString);
      // 3. If the parsed user object has a token property...
      if (user && user.token) {
        // 4. It adds the Authorization header to the request.
        config.headers["Authorization"] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
