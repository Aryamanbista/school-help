import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; // Import toast
import { authService } from "../services/authService";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

const RegisterVolunteerPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    occupation: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Basic validation example
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return;
      }
      authService.registerVolunteer(formData);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message); // Use toast for error feedback
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-center text-neutral-900 mb-6">
          Create Your Volunteer Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Improved form fields with labels */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Username
            </label>
            <Input
              id="username"
              name="username"
              placeholder="Choose a unique username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Full Name
            </label>
            <Input
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="occupation"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Occupation
            </label>
            <Input
              id="occupation"
              name="occupation"
              placeholder="e.g., Software Developer, Teacher"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full !mt-8 py-3">
            Register
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default RegisterVolunteerPage;
