import React from "react";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <main className="container mx-auto px-6 py-8">{children}</main>
      {/* A footer can be added here later */}
    </div>
  );
};

export default MainLayout;
