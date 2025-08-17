import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import Card from "../components/Card";
import { FaChalkboardTeacher, FaHandsHelping, FaLaptop } from "react-icons/fa";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Hero Section */}
      <section className="text-center py-20 bg-red-50 rounded-lg">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-5xl font-extrabold text-gray-800"
        >
          Empowering Education, Together.
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
          className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          SchoolHelp is a platform dedicated to connecting passionate volunteers
          with schools in need of educational support and resources.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex justify-center space-x-4"
        >
          <Link to="/volunteer/dashboard">
            <Button className="px-8 py-3 text-lg">Browse Requests</Button>
          </Link>
          <Link to="/school-admin/dashboard">
            <Button className="px-8 py-3 text-lg bg-gray-700 hover:bg-gray-800">
              Request Help
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <FaChalkboardTeacher className="text-5xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                1. Schools Post Requests
              </h3>
              <p className="text-gray-600">
                Administrators can easily post requests for tutorial assistance
                or essential digital resources.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <FaHandsHelping className="text-5xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                2. Volunteers Make Offers
              </h3>
              <p className="text-gray-600">
                Volunteers browse the requests and make offers to help with
                their time, skills, or donations.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <FaLaptop className="text-5xl text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                3. Students Get Support
              </h3>
              <p className="text-gray-600">
                The school reviews offers, accepts the best fit, and students
                receive the help they need to succeed.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default HomePage;
