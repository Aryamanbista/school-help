import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center justify-center text-center py-16"
    >
      <h1 className="text-9xl font-extrabold text-red-600 tracking-wider">
        404
      </h1>
      <h2 className="text-4xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        Oops! It looks like the page you were trying to reach doesn't exist. It
        might have been moved or deleted.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button className="px-6 py-3 text-lg">Go Back Home</Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
