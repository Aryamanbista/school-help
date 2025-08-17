import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import {
  FaChalkboardTeacher,
  FaHandsHelping,
  FaLaptop,
  FaArrowRight,
} from "react-icons/fa";

// Variants for sequential animation
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-gray-50 text-gray-900 font-sans"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-40 text-center bg-red-600">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter"
          >
            Empowering Education, One Connection at a Time.
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            // --- CHANGE: Enhanced contrast for better readability ---
            className="mt-6  text-xl md:text-2xl text-white/80 m-3xl mx-auto "
          >
            SchoolHelp bridges the gap between passionate volunteers and schools<br/> in need of 
           educational support and essential resources.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/volunteer/dashboard">
              {/* Note: This button styling assumes your base Button component can be overridden like this. */}
              <Button className="w-full sm:w-auto px-10 py-4 text-lg font-bold bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-colors duration-200 shadow-xl">
                I want to Volunteer
              </Button>
            </Link>
            <Link to="/school-admin/dashboard">
              <Button className="w-full sm:w-auto px-10 py-4 text-lg font-bold bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-colors duration-200 shadow-xl">
                Our School Needs Help
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-16"
          >
            A simple three-step process to connect schools with the support they need.
          </motion.p>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12"
          >
            <motion.div variants={itemVariants}>
              <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent transform transition-transform duration-300 hover:scale-105 hover:border-red-600">
                <div className="bg-red-600 p-6 rounded-full mb-6">
                  <FaChalkboardTeacher className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  1. Schools Post Needs
                </h3>
                <p className="text-gray-600">
                  Administrators create detailed requests for tutoring, materials, or technical support.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent transform transition-transform duration-300 hover:scale-105 hover:border-red-600">
                <div className="bg-red-600 p-6 rounded-full mb-6">
                  <FaHandsHelping className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  2. Volunteers Make Offers
                </h3>
                <p className="text-gray-600">
                  Volunteers browse the requests and offer their time, skills, or donations to help.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent transform transition-transform duration-300 hover:scale-105 hover:border-red-600">
                <div className="bg-red-600 p-6 rounded-full mb-6">
                  <FaLaptop className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  3. Education is Empowered
                </h3>
                <p className="text-gray-600">
                  Schools review and accept the best offers, bringing vital support to their students.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-24 bg-white shadow-inner">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Join SchoolHelp today and become part of a community that's changing education for the better.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* --- FIX: Corrected link to point to the right registration page --- */}
            <Link to="/register-volunteer">
              <Button className="px-12 py-4 text-lg font-bold bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 shadow-xl flex items-center justify-center mx-auto">
                Get Started
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;