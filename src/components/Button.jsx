import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;