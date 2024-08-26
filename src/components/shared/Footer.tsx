import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
interface NavProp {
  name: string;
  href: string;
  className: string;
}
const Footer: React.FC = () => {
  const path = useLocation();
  const CustomNav = ({ name, href, className }: NavProp) => {
    return (
      <Link
        to={href}
        className={`${className} text-[16px] ${
          path.pathname === href
            ? "text-transparent bg-gradient-to-r  from-purple-600 to-indigo-600 bg-clip-text font-bold"
            : "text-white font-[400]"
        } `}
      >
        {name}
      </Link>
    );
  };
  return (
    <div className="bg-[#1d1a3d] mt-32">
      <div className="max-w-[1240px]  mx-auto">
        <div className="grid grid-cols-2 md:gap-5 gap-10 md:grid-cols-2 lg:grid-cols-4 p-10">
          <div className="flex flex-col lg:col-span-1 col-span-2 gap-4">
            <h1 className="text-[26px] text-white font-bold">
              Royal Education
            </h1>
            <p className="text-[16px] text-white">
              Follow us on social media to get More update about us
            </p>
            <div className="flex gap-4">
              <FaFacebook className="text-white text-2xl" />
              <FaYoutube className="text-white text-2xl" />
              <FaTiktok className="text-white text-2xl" />
            </div>
          </div>
          <div className="flex flex-col banglafont md:mx-auto">
            <CustomNav name="Home" href="/" className="" />
            <CustomNav name="All Courses" href="/skill" className="" />
            <CustomNav name="Contact" href="/contact-us" className="" />
          </div>
          <div className="flex flex-col mx-auto">
            <CustomNav name="Admission Test" href="/job" className="" />
            <CustomNav
              name="Job Preparation"
              href="/admission"
              className=""
            />{" "}
            <CustomNav name="About" href="/about" className="" />
          </div>
          <div className="flex md:flex-col lg:col-span-1 col-span-2 text-[16px] mx-auto text-white gap-2">
            <p className="text-nowrap text-[14px] hover:underline cursor-pointer">
              Terms & Conditions
            </p>
            <p className="text-nowrap text-[14px] hover:underline cursor-pointer">
              Cookies Policy
            </p>
            <a
              className="text-nowrap text-[14px] hover:underline cursor-pointer"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <span className="h-[1px] flex w-full bg-white"></span>
        <div className="flex py-4 justify-center items-center text-white">
          {" "}
          &copy; 2024 Royal Education All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
