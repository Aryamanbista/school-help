import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // We will add logic here later to show different links based on auth status
  return (
    <header className="bg-white shadow-md w-full">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SchoolHelp
        </Link>
        <div>
          <Link to="/login" className="text-gray-600 hover:text-blue-600 px-4">Login</Link>
          <Link to="/register-volunteer" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
            Register as Volunteer
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;