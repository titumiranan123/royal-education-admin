/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

import Playbutton from "./Playbutton";
import logouts from "../../assets/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import Swal from "sweetalert2";
interface NavProp {
  name: string;
  href: string;
  className: string;
}

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const CustomNav = ({ name, href, className }: NavProp) => {
    return (
      <Link
        to={href}
        className={`${className} ${path.pathname === href
            ? "text-transparent text-[18px] bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text font-bold"
            : "text-white font-[400]"
          } montserrat`}
      >
        {name}
      </Link>
    );
  };
  const path = useLocation();
  const handalprofile = () => {
    setProfile(!profile);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    setProfile(!profile);
    navigate("/");
    dispatch(logout());
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className=" relative max-w-[1440px]  z-50  py-6 lg:px-0 px-2 mx-auto ">
      <div className=" max-w-[1340px] relative mx-auto ">
        <nav className="flex justify-between items-center ">
          <div className="relative">
            <div className="logo text-white relative">
              <img
                src={logo}
                alt=""
                className="lg:w-[150px] relative z-40 lg:h-[50px] w-[100px] h-[35px]"
              />
              <div className="w-10 z-10 h-10 blur-xl bg-[#532679] absolute top-0 left-0 "></div>
            </div>
          </div>

          <div
            className={`navItem hidden  bg-[#3831753D] ${user?.isAuthenticated ? "w-[714px]" : "w-[614px]"
              } h-[58px] lg:flex justify-center items-center gap-5 rounded-[30px]`}
          >
            <CustomNav name="Home" href="/" className="" />
            <CustomNav name="All Courses" href="/all-course" className="" />
            <CustomNav
              name="Admission Batch 2024"
              href="/admission"
              className=""
            />

            {user?.isAuthenticated && (
              <CustomNav name="My Classes" href="/mydashboard/myclass" className="" />
            )}
            <CustomNav name="Blog" href="/blog" className="" />
            <CustomNav name="Contact Us" href="/contact-us" className="" />
          </div>
          <div className="btns hidden z-50 md:flex justify-center items-center gap-5">
            {!user?.isAuthenticated && (
              <Link to={"/login"} className="gradient-text text-xl font-bold">
                Sign In
              </Link>
            )}
            <button className="gradient-button text-white w-[120px] h-[50px]">
              Enroll Now
            </button>
            {user?.isAuthenticated && (
              <div onClick={() => handalprofile()} className="cursor-pointer">
                <Playbutton />
              </div>
            )}
          </div>
          <div className="btns md:hidden flex justify-center items-center gap-5">
            {user?.isAuthenticated && (
              <div onClick={() => handalprofile()} className="cursor-pointer">
                <Playbutton />
              </div>
            )}
            <button
              onClick={() => setOpen(!open)}
              className=" text-white flex justify-center flex-col items-center gap-1"
            >
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-[30px] h-[3px]"></span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-[30px] h-[3px]"></span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-[30px] h-[3px]"></span>
            </button>
          </div>
        </nav>
        {open && (
          <div className="bg-[#383175] transition-transform duration-300 transform translate-x-0 px-24 absolute top-0 z-50 right-0 h-[400px] gap-2 py-10  mx-auto rounded-lg w-full ">
            <div className="flex flex-col relative">
              <div
                onClick={() => setOpen(!open)}
                className="absolute cursor-pointer -top-4 -right-20"
              >
                <div className=" flex flex-col relative gap-1">
                  <span className="bg-gradient-to-r rotate-45 from-purple-600 to-indigo-600 w-[20px] h-[3px]"></span>
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 w-[20px] h-[3px] absolute -rotate-45"></span>
                </div>
              </div>
              <CustomNav
                name="Home"
                href="/"
                className="text-left text-[18px]"
              />
              <CustomNav
                name="All Courses"
                href="/all-course"
                className="text-left text-[18px]"
              />
              <CustomNav
                name="Admission Batch 2024"
                href="/admission"
                className="text-left text-[18px]"
              />
              <CustomNav
                name="Job Preparation"
                href="/job-preparation"
                className="text-[18px]"
              />
              <CustomNav name="About" href="/about" className="text-[18px]" />
              <CustomNav
                name="Contact Us"
                href="/contact-us"
                className="text-[18px]"
              />
            </div>
          </div>
        )}
        {
          <div
            className={`w-72 h-[450px] absolute md:top-20 top-[50px] -right-2 md:right-0 z-30 transition-transform duration-200 ${!profile
                ? "-translate-x-[-200%] opacity-0  hidden "
                : "translate-y-0 animate-cone translate-x-0"
              } bg-gradient-to-tr from-purple-600 to-indigo-600 p-[2px] text-white shadow-lg rounded-lg`}
          >
            <div className="w-full rounded-lg h-full bg-[#100828]  p-10">
              <div className="flex justify-center items-center flex-col gap-2">
                <img
                  className="rounded-full h-24 w-24"
                  src={user?.user?.photoUrl}
                  alt=""
                />
                <p className="text-xl font-semibold montserrat">{user.name}</p>
                <div className="gradient-button py-2 px-4 montserrat">
                  View Profile
                </div>
              </div>
              <div className="mt-5 flex gap-4  flex-col">
                <Link
                  className="font-semibold montserrat"
                  to={"/mydashboard/myclass"}
                >
                  My Classes
                </Link>
                <Link
                  className="font-semibold montserrat"
                  to={"/mydashboard/leaderboard"}
                >
                  Leader Board
                </Link>
                <Link
                  className="font-semibold montserrat"
                  to={"/mydashboard/leaderboard"}
                >
                  Announcement
                </Link>
                <Link
                  className="font-semibold montserrat"
                  to={"/mydashboard/leaderboard"}
                >
                  Change Password
                </Link>
                <div className="font-semibold montserrat flex items-center gap-2 ">
                  <span
                    onClick={() => handleLogout()}
                    className="text-[#E855DE] cursor-pointer"
                  >
                    LogOut
                  </span>
                  <img src={logouts} />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
