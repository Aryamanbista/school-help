import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { requestService } from "../services/requestService";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const CreateRequestPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [requestType, setRequestType] = useState("Tutorial");
  const [formData, setFormData] = useState({
    description: "",
    studentLevel: "",
    numStudents: "",
    resourceType: "",
    numRequired: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      schoolID: currentUser.schoolID,
      schoolName: currentUser.schoolName,
      city: "Metroville", // Should be part of school data
      requestType,
      description: formData.description,
      ...(requestType === "Tutorial"
        ? {
            studentLevel: formData.studentLevel,
            numStudents: formData.numStudents,
          }
        : {
            resourceType: formData.resourceType,
            numRequired: formData.numRequired,
          }),
    };
    requestService.addRequest(payload);
    toast.success("Request submitted successfully!");
    navigate("/school-admin/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>
      </div>
      <Card className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Request</h1>
        <div className="mb-4">
          <label className="mr-4">Request Type:</label>
          <select
            onChange={(e) => setRequestType(e.target.value)}
            value={requestType}
            className="p-2 border rounded-lg"
          >
            <option value="Tutorial">Tutorial Request</option>
            <option value="Resource">Resource Request</option>
          </select>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="description"
            placeholder="Description of the request"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {requestType === "Tutorial" ? (
            <>
              <Input
                name="studentLevel"
                placeholder="Student Level (e.g., Grade 10)"
                value={formData.studentLevel}
                onChange={handleChange}
                required
              />
              <Input
                name="numStudents"
                type="number"
                placeholder="Number of Students"
                value={formData.numStudents}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <select
                name="resourceType"
                onChange={handleChange}
                value={formData.resourceType}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Resource Type</option>
                <option value="mobile device">Mobile Device</option>
                <option value="personal computer">Personal Computer</option>
                <option value="networking equipment">
                  Networking Equipment
                </option>
              </select>
              <Input
                name="numRequired"
                type="number"
                placeholder="Number Required"
                value={formData.numRequired}
                onChange={handleChange}
                required
              />
            </>
          )}
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};
export default CreateRequestPage;
