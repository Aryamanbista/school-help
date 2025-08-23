import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

const SchoolAdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchoolRequests = async () => {
      try {
        // This new endpoint gets requests just for the admin's school
        const { data } = await api.get("/requests/myschool");
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch school requests", error);
        toast.error("Could not load your school's requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchSchoolRequests();
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CLOSED":
        return "bg-neutral-200 text-neutral-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-neutral-900">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-lg text-neutral-500">
            Manage your school's help requests.
          </p>
        </div>
        <Link to="/school-admin/create-request">
          <Button className="py-3 px-5">Create New Request</Button>
        </Link>
      </div>
      <Card>
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">
          Your Requests
        </h2>
        {requests.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {requests.map((req) => (
              <motion.div
                key={req._id}
                variants={itemVariants}
                whileHover={{ backgroundColor: "#f8fafc" }}
                className="rounded-lg"
              >
                <Link
                  to={`/school-admin/review-offers/${req._id}`}
                  className="block p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-neutral-700">
                        {req.description}
                      </p>
                      <p className="text-sm text-neutral-500">
                        Posted: {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`font-semibold px-3 py-1 rounded-full text-xs ${getStatusStyles(
                        req.requestStatus
                      )}`}
                    >
                      {req.requestStatus}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-10">
            <p className="text-neutral-500">
              You have not created any requests yet.
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default SchoolAdminDashboard;
