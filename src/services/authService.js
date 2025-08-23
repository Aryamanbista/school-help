import api from "./api";

const TOKEN_KEY = "schoolhelp_token";
const USER_KEY = "schoolhelp_user";

export const authService = {
  // Register a new volunteer by calling the backend endpoint
  registerVolunteer: async (userData) => {
    const response = await api.post("/auth/register/volunteer", userData);
    return response.data;
  },

  // Login a user by calling the backend endpoint
  login: async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    if (response.data && response.data.token) {
      // On successful login, store the token and user info
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    }
    return response.data;
  },

  // Logout by clearing stored credentials
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Get the current user from localStorage (remains the same)
  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },
};
