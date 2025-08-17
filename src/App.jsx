import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterVolunteerPage from "./pages/RegisterVolunteerPage";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import SchoolAdminDashboard from "./pages/SchoolAdminDashboard";
import RequestDetailsPage from "./pages/RequestDetailsPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-volunteer" element={<RegisterVolunteerPage />} />

        {/* Volunteer Routes */}
        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Volunteer"]}>
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request/:id"
          element={
            <ProtectedRoute allowedRoles={["Volunteer"]}>
              <RequestDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* School Admin Routes */}
        <Route
          path="/school-admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["School Admin"]}>
              <SchoolAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for 404 Not Found would go here */}
      </Routes>
    </MainLayout>
  );
}

export default App;
