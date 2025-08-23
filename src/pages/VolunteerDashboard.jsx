import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaChalkboardTeacher, FaLaptop } from "react-icons/fa";

const VolunteerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await api.get("/requests");
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
        toast.error("Could not load requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-neutral-900">
          Available Requests
        </h1>
        <p className="mt-2 text-lg text-neutral-500">
          Here's where you can make a difference.
        </p>
      </div>
      {requests.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {requests.map((req) => (
            <motion.div
              key={req._id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
            >
              <Link to={`/request/${req._id}`}>
                <Card className="h-full flex flex-col">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-3">
                      {req.requestType === "Tutorial" ? (
                        <FaChalkboardTeacher className="text-primary text-2xl" />
                      ) : (
                        <FaLaptop className="text-primary text-2xl" />
                      )}
                      <h2 className="text-xl font-bold text-neutral-800">
                        {req.school.schoolName}
                      </h2>
                    </div>
                    <p className="mt-2 text-neutral-600">{req.description}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-100 text-sm text-neutral-500">
                    <p>
                      <strong>Type:</strong> {req.requestType}
                    </p>
                    <p>
                      <strong>City:</strong> {req.school.city}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-neutral-500">
            No new requests available right now.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default VolunteerDashboard;
