/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUser from "../../../hook/useUser";
import Loader from "../../../components/utils/Lodder";

const Users: React.FC = () => {
  const { data, isLoading } = useUser();

  return (
    <div className=" mt-5">
      <div className="flex flex-wrap gap-5 items-center justify-between pe-5">
        <div className="bg p-[2px] rounded-lg">
          <div className="text-white bg-[#272758] rounded-lg px-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search ....."
              className="px-4 py-2 outline-none focus:outline-none  rounded-lg bg-[#272758] "
            />
            <FaSearch className="text-xl " />
          </div>
        </div>
        {/* filter */}
        <div className="flex gap-3 items-center">
          <p className="montserrat font-bold gradient-text text-[20px]">
            {" "}
            Fillter
          </p>
          <select
            className="bg rounded-lg py-2 px-4 text-white montserrat outline-none focus:outline-none"
            name=""
            id=""
          >
            <option
              className="gradient-text option bg-black font-semibold montserrat"
              value="admin"
            >
              Admin
            </option>
            <option
              className="gradient-text option font-semibold montserrat"
              value="user"
            >
              User
            </option>
            <option
              className="gradient-text option font-semibold montserrat"
              value="teacher"
            >
              Teacher
            </option>
          </select>
        </div>
      </div>
      <div className="bg h-[2px] w-full mt-4"></div>
      <div className="overflow-x-auto w-full mt-4">
        <div className="text-lg border-b border-[#2c285f] bg-[#131129] overflow-x-auto text-white font-semibold uppercase grid grid-cols-1 md:grid-cols-5">
          <div className="px-6 py-3 text-center md:text-left">Name</div>
          <div className="px-6 py-3 text-center md:text-left">Email</div>
          <div className="px-6 py-3 text-center md:text-left md:pl-20">
            Mobile
          </div>
          <div className="px-6 col-span-1 md:col-span-2 py-3 text-center md:text-left">
            Action
          </div>
        </div>

        {/* Loader */}
        <div className="text-center mt-4">{isLoading && <Loader />}</div>

        {/* User data */}
        {data?.data.map((user: any) => (
          <div
            className="text-lg border-b border-[#2c285f] bg-[#131129] text-white font-semibold grid grid-cols-1 md:grid-cols-5"
            key={user._id}
          >
            <div className="px-6 py-3 text-center md:text-left">
              {user?.name}
            </div>
            <div className="px-6 py-3 text-center md:text-left">
              {user?.email}
            </div>
            <div className="px-6 py-3 text-center md:text-left md:pl-20">
              {user?.mobile}
            </div>

            {/* Actions */}
            <div className="px-6 col-span-1 md:col-span-2 py-3 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-2 md:gap-5">
                <Link
                  to={`/user/${user._id}`}
                  className="gradient-button text-white py-2 px-3 md:px-5 font-semibold text-lg"
                >
                  Permission
                </Link>
                <Link
                  to={`/user/${user._id}`}
                  className="gradient-button text-white py-2 px-3 md:px-5 font-semibold text-lg"
                >
                  Update
                </Link>
                <button className="gradient-button text-white py-2 px-3 md:px-5 font-semibold text-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
