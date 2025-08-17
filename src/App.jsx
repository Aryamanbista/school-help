import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterVolunteerPage from "./pages/RegisterVolunteerPage";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import SchoolAdminDashboard from "./pages/SchoolAdminDashboard";
import RequestDetailsPage from "./pages/RequestDetailsPage";
import CreateRequestPage from "./pages/CreateRequestPage";
import ReviewOffersPage from "./pages/ReviewOffersPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const location = useLocation();
  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register-volunteer"
            element={<RegisterVolunteerPage />}
          />

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
          <Route
            path="/school-admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["School Admin"]}>
                <SchoolAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/school-admin/create-request"
            element={
              <ProtectedRoute allowedRoles={["School Admin"]}>
                <CreateRequestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/school-admin/review-offers/:id"
            element={
              <ProtectedRoute allowedRoles={["School Admin"]}>
                <ReviewOffersPage />
              </ProtectedRoute>
            }
          />
          {/* Catch-all for 404 Not Found would go here */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
