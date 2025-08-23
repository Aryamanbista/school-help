import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api"; // Import our new api client

const AuthContext = createContext(null);
const USER_STORAGE_KEY = "schoolhelp_user";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for user data on initial app load
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // The function is now async
    const response = await api.post("/auth/login", { username, password });
    if (response.data) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.data));
      setCurrentUser(response.data);
      return response.data;
    }
  };

  const register = async (userData) => {
    const response = await api.post("/auth/register/volunteer", userData);
    if (response.data) {
      // We don't log in the user automatically, just store their data for login
      // Or you could log them in by also calling login() here
      return response.data;
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setCurrentUser(null);
  };

  const value = { currentUser, login, logout, register, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
