/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  FaDatabase,
  FaFileInvoice,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import {
  RiDashboardLine,
  RiLogoutBoxLine,
  RiVideoAddFill,
} from "react-icons/ri";
import user from "../../../assets/testimonial/user.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "jwt-js-decode";
import Cookies from "js-cookie";
import { clearAuth, logout, setAuth } from "../../../redux/userSlice";
import { RootState } from "../../../redux/Store";
const DashboardLayout: React.FC = () => {
const [isOpen, setIsOpen] = useState(false);
 const dispatch = useDispatch();
 const isTokenExpired = (token: string) => {
   try {
     const decoded: any = decode(token); // Decode token
     const currentTime = Date.now() / 1000; // Get current time in seconds
     // Compare expiration time with current time
     return decoded?.exp && decoded.exp < currentTime;
   } catch (error) {
     console.error("Error decoding token:", error);
     return true; // If decoding fails, treat the token as expired
   }
 };
 useEffect(() => {
   const token = Cookies.get("accessToken");
   
   if (token && !isTokenExpired(token)) {
     try {
       const decoded = decode(token) as any; 
       dispatch(setAuth({ user: decoded, accessToken: token }));
     } catch (error) {
       Cookies.remove("accessToken");
       dispatch(clearAuth());
     }
   } else {
     Cookies.remove("accessToken");
     dispatch(clearAuth());
   }
 }, [dispatch]);





  return (
    <div className="grid min-h-screen  relative lg:grid-cols-5  grid-cols-1">
      <div className="lg:col-span-1 lg:block hidden">
        <Sidebar />
      </div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" text-white lg:hidden absolute top-10 right-8 flex justify-center scale-150  flex-col items-center gap-1 "
        >
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-[28px] h-[3px]"></span>
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-[28px] h-[3px]"></span>
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-[28px] h-[3px]"></span>
        </button>
      ) : (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute cursor-pointer lg:hidden top-9 right-8 `}
        >
          <div className=" flex flex-col relative gap-1">
            <span className="bg-gradient-to-r rotate-45 from-purple-600 to-indigo-600 w-[28px] h-[3px]"></span>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-[28px] h-[3px] absolute -rotate-45"></span>
          </div>
        </div>
      )}
      {
        <div
          className={`md:w-[50%] lg:hidden  lg:w-[100%] absolute top-0 z-50 transition-transform ${
            !isOpen ? "translate-x-[-100%]" : "translate-x-[0%]"
          } duration-300  bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE] pe-[2px]`}
        >
          <div className={`relative `}>
            <div className="bg-black p-10">
              <img className="w-20 mx-auto h-20" src={user} alt="" />
              <p className="text-center text-white mt-5 montserrat font-semibold">
                Teacher
              </p>
            </div>
            <nav className="bg-black   flex flex-col gap-2 mx-auto min-h-screen">
              <div
                className={`flex items-center ms-4 px-14 ${
                  location.pathname === "/dashboard" && "bg"
                }`}
              >
                <a
                  href="/dashboard"
                  className="flex items-center py-2 text-white  rounded-lg "
                >
                  <RiDashboardLine className="w-5 h-5  transition duration-75 " />
                  <span className="ms-3 text-white montserrat font-semibold">
                    Dashboard
                  </span>
                </a>
              </div>
              <div className="">
                <a href="#" className="flex items-center p-2  rounded-lg ">
                  <span className="px-14 gradient-text montserrat font-bold  text-[20px] text-white">
                    Data
                  </span>
                </a>
                <div className="flex flex-col gap-2">
                  <Link
                    to={"/dashboard/all-course"}
                    className={`flex items-center ms-4 px-14 py-2 ${
                      location.pathname === "/dashboard/all-course" && "bg"
                    }`}
                  >
                    <FaDatabase className="text-xl text-white" />
                    <span className="ms-3 text-white montserrat font-semibold">
                      All Course
                    </span>
                  </Link>
                  <Link
                    to={"/dashboard/user"}
                    className={`flex items-center ms-4 px-14 py-2 ${
                      location.pathname === "/dashboard/user" && "bg"
                    }`}
                  >
                    <FaUsers className="text-xl text-white" />
                    <span className="ms-3 text-white montserrat font-semibold">
                      Users
                    </span>
                  </Link>
                  {/* <Link
                    to={"/dashboard/mcq-store"}
                    className={`flex items-center ms-4 px-14 py-2 ${
                      location.pathname === "/dashboard/user" && "bg"
                    }`}
                  >
                    <FaUsers className="text-xl text-white" />
                    <span className="ms-3 text-white montserrat font-semibold">
                      MCQ store
                    </span>
                  </Link> */}
                  <Link
                    to="/dashboard/invoice"
                    className={`flex items-center ms-4 px-14 py-2 cursor-pointer ${
                      location.pathname === "/dashboard/invoice" && "bg"
                    }`}
                  >
                    <FaFileInvoice className="text-xl text-white" />
                    <span className="ms-3 text-white montserrat font-semibold">
                      Invoice
                    </span>
                  </Link>
                </div>
              </div>
              <div className="">
                <a href="#" className="flex items-center p-2  rounded-lg ">
                  <span className="px-14 gradient-text montserrat font-bold text-[20px] text-white">
                    Content
                  </span>
                </a>
                <div className="flex flex-col gap-2">
                  <Link
                    to={"/dashboard/create-course"}
                    className={`flex items-center ms-4 px-14 py-2 cursor-pointer ${
                      location.pathname === "/dashboard/create-course" && "bg"
                    }`}
                  >
                    <RiVideoAddFill className="text-xl text-white" />
                    <span className="ms-3 text-white montserrat font-semibold">
                      Create Course
                    </span>
                  </Link>
                  {/* <Link
                    to={"/dashboard/live-course"}
                    className={`flex items-center ms-4 px-14 py-2 cursor-pointer ${
                      location.pathname === "/dashboard/live-course" && "bg"
                    }`}
                  >
                    <FaFileVideo className="text-xl text-white" />
                    <span className="ms-3 text-white montserrat font-semibold">
                      Live Course
                    </span>
                  </Link> */}
                </div>
              </div>
              <div className="">
                <span className="ms-2 text-[20px] text-white px-14 gradient-text montserrat font-bold">
                  Controllers
                </span>

                <div className="flex flex-col gap-2">
                  <Link
                    to={"/dashboard/mannage-team"}
                    className={`flex items-center  ms-4 px-14 py-2 cursor-pointer ${
                      location.pathname === "/dashboard/mannage-team" && "bg"
                    }`}
                  >
                    <FaUsers className="text-xl text-white" />
                  
                      <span className="ms-3 montserrat font-semibold text-white ">
                        Manage Team
                      </span>
                  
                  </Link>
                </div>
              </div>
              <div className="px-14">
                {/* <span className="ms-2 text-[20px] text-white gradient-text montserrat font-bold">
              Analytics
            </span> */}
                {/* <div className="flex flex-col gap-2">
              <div className="flex items-center ms-4 mt-2">
                <IoMdAnalytics className="text-xl text-white" />
                <Link to={"/"}>
                  <span className="ms-3 text-white montserrat font-semibold">Course Analytics </span>
                </Link>
              </div>
            </div> */}
              </div>
              <div className="flex justify-center items-center mt-14">
                <div className="p-[1px] w-[207px] rounded-lg bg">
                  <a
                    href="#"
                    className="flex  items-center p-2  w-[200px]  bg-black justify-center rounded-lg "
                  >
                    <RiLogoutBoxLine className="w-5   h-5 text-white  transition duration-75 " />
                    <span className="ms-1 gradient-text montserrat font-bold text-white">
                      Sign Out
                    </span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      }
      <div className="lg:col-span-4 md:py-10 pt-14  lg:px-2 px-5">
        <div className=" lg:flex hidden justify-end items-center">
          <div className="bg p-[2px] rounded-lg mt-4 me-4">
            <div className="text-white   bg-black rounded-lg py-2 px-4">
              <FaUser />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
 const {user} = useSelector((state: RootState) => state.user);
const dispatch = useDispatch()
  return (
    <div className="w-full sticky top-0 left-0  bg-gradient-to-tr min-h-screen from-[#DC02CE] to-[#5C53FE] pe-[2px]">
      <div className={`relative `}>
        <div className="bg-black p-10">
          <img className="w-20 mx-auto h-20" src={user?.photoUrl} alt="" />
          <p className="text-center text-white mt-5 montserrat font-semibold">
            <span className="text-[20px]"> {user?.name} </span>{" "}
            <span className="ms-1 text-[14px]">({user?.role})</span>
          </p>
        </div>
        <nav className="bg-black   flex flex-col gap-2 mx-auto min-h-screen">
          <div
            className={`flex items-center ms-4 px-14 ${
              location.pathname === "/dashboard" && "bg"
            }`}
          >
            <a
              href="/dashboard"
              className="flex items-center py-2 text-white  rounded-lg "
            >
              <RiDashboardLine className="w-5 h-5  transition duration-75 " />
              <span className="ms-3 text-white montserrat font-semibold">
                Dashboard
              </span>
            </a>
          </div>
          <div className="">
            <a href="#" className="flex items-center p-2  rounded-lg ">
              <span className="px-14 gradient-text montserrat font-bold  text-[20px] text-white">
                Data
              </span>
            </a>
            <div className="flex flex-col gap-2">
              <Link
                to={"/dashboard/all-course"}
                className={`flex items-center ms-4 px-14 py-2 ${
                  location.pathname === "/dashboard/all-course" && "bg"
                }`}
              >
                <FaDatabase className="text-xl text-white" />
                <span className="ms-3 text-white montserrat font-semibold">
                  All Course
                </span>
              </Link>
              {/* <Link
                to={"/dashboard/mcq-store"}
                className={`flex items-center ms-4 px-14 py-2 ${
                  location.pathname === "/dashboard/mcq-store" && "bg"
                }`}
              >
                <FaStore className="text-xl text-white" />
                <span className="ms-3 text-white montserrat font-semibold">
                  MCQ store
                </span>
              </Link> */}
              <Link
                to={"/dashboard/user"}
                className={`flex items-center ms-4 px-14 py-2 ${
                  location.pathname === "/dashboard/user" && "bg"
                }`}
              >
                <FaUsers className="text-xl text-white" />
                <span className="ms-3 text-white montserrat font-semibold">
                  Users
                </span>
              </Link>
              <Link
                to="/dashboard/invoice"
                className={`flex items-center ms-4 px-14 py-2 cursor-pointer ${
                  location.pathname === "/dashboard/invoice" && "bg"
                }`}
              >
                <FaFileInvoice className="text-xl text-white" />
                <span className="ms-3 text-white montserrat font-semibold">
                  Invoice
                </span>
              </Link>
            </div>
          </div>
          <div className="">
            <a href="#" className="flex items-center p-2  rounded-lg ">
              <span className="px-14 gradient-text montserrat font-bold text-[20px] text-white">
                Content
              </span>
            </a>
            <div className="flex flex-col gap-2">
              <Link
                to={"/dashboard/create-course"}
                className={`flex items-center ms-4 px-14 py-2 cursor-pointer ${
                  location.pathname === "/dashboard/create-course" && "bg"
                }`}
              >
                <RiVideoAddFill className="text-xl text-white" />
                <span className="ms-3 text-white montserrat font-semibold">
                  Create Course
                </span>
              </Link>
              {/* <Link
                to={"/dashboard/live-course"}
                className={`flex items-center ms-4 px-14 py-2 cursor-pointer ${
                  location.pathname === "/dashboard/live-course" && "bg"
                }`}
              >
                <FaFileVideo className="text-xl text-white" />
                <span className="ms-3 text-white montserrat font-semibold">
                  Live Course
                </span>
              </Link> */}
            </div>
          </div>
          <div className="">
            <span className="ms-2 text-[20px] text-white px-14 gradient-text montserrat font-bold">
              Controllers
            </span>

            <div className="flex flex-col gap-2">
              <Link
                to={"/dashboard/mannage-team"}
                className={`flex items-center ms-4 px-14 py-2 cursor-pointer ${
                  location.pathname === "/dashboard/mannage-team" && "bg"
                }`}
              >
                <FaUsers className="text-xl text-white" />
           
                  <span className="ms-3 montserrat font-semibold text-white ">
                    Manage Team
                  </span>
              
              </Link>
            </div>
          </div>
          <div className="px-14">
            {/* <span className="ms-2 text-[20px] text-white gradient-text montserrat font-bold">
              Analytics
            </span> */}
            {/* <div className="flex flex-col gap-2">
              <div className="flex items-center ms-4 mt-2">
                <IoMdAnalytics className="text-xl text-white" />
                <Link to={"/"}>
                  <span className="ms-3 text-white montserrat font-semibold">Course Analytics </span>
                </Link>
              </div>
            </div> */}
          </div>
          <div className="flex justify-center items-center mt-14">
            <div className="p-[1px] w-[207px] rounded-lg bg">
              <button
                onClick={() => {
                  dispatch(logout());
                }}
                className="flex  items-center p-2  w-[200px]  bg-black justify-center rounded-lg "
              >
                <RiLogoutBoxLine className="w-5   h-5 text-white  transition duration-75 " />
                <span className="ms-1 gradient-text montserrat font-bold text-white">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
