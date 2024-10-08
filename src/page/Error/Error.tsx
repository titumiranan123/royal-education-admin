import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 to-indigo-500 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2">
          But don't worry, you can always go back to the homepage.
        </p>
        <Link to={'/'} className="mt-6 bg-white text-indigo-500 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 hover:text-white transition">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
