import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterVolunteerPage from './pages/RegisterVolunteerPage';
import SchoolAdminDashboard from './pages/SchoolAdminDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-volunteer" element={<RegisterVolunteerPage />} />
        <Route path="/school-admin/dashboard" element={<SchoolAdminDashboard />} />
        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
      </Routes>
    </MainLayout>
  );
}

export default App;