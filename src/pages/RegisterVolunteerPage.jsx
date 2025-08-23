import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // We get the register function from here
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

const RegisterVolunteerPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); // Use the register function from context
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    occupation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    setIsSubmitting(true);
    try {
      await register(formData);
      toast.success("Registration successful! Please log in to continue.");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // The JSX is largely the same, but we add the disabled state to the button
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-center text-neutral-900 mb-6">
          Create Your Volunteer Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Form fields are the same as before */}
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
              placeholder="••••••••"
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
              placeholder="John Doe"
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
              placeholder="you@example.com"
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
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full !mt-8 py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default RegisterVolunteerPage;
