import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!currentUser) return "/";
    switch (currentUser.role) {
      case "Volunteer":
        return "/volunteer/dashboard";
      case "School Admin":
        return "/school-admin/dashboard";
      // Add case for System Admin later
      default:
        return "/";
    }
  };

  return (
    <header className="bg-white shadow-md w-full">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          SchoolHelp
        </Link>
        <div>
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {currentUser.fullname}!</span>
              <Link
                to={getDashboardLink()}
                className="text-gray-600 hover:text-primary"
              >
                Dashboard
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary px-4"
              >
                Login
              </Link>
              <Link to="/register-volunteer">
                <Button>Register as Volunteer</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
