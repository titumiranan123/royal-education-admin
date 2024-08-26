import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/shared/Navbar";
import Footer from "../../../components/shared/Footer";

const Userdashboard: React.FC = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="">
        <div className="col-span-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Userdashboard;
