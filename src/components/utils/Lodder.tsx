import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
