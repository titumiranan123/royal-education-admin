import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Main: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />

      <Footer />
    </div>
  );
};

export default Main;
