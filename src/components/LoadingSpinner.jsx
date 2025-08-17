import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  );
};
export default LoadingSpinner;
