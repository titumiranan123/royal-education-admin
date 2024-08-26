/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useCourse from "../../../hook/useCourse";

import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Allcourse: React.FC = () => {
  const { data: course } = useCourse();

  return (
    <div className="text-white min-h-screen max-w-[1240px] mx-auto">
      <div>
        <div className="mt-20 flex justify-between items-center md:flex-nowrap gap-5 flex-wrap">
          <div className="flex justify-center items-center lg:gap-20 md:flex-nowrap gap-5 flex-wrap">
            <p className="gradient-text text-[24px] font-bold">All Course</p>
            <div className="bg p-[2px] rounded-lg">
              <div className="text-white bg-[#272758] rounded-lg px-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search ....."
                  className="px-4 py-2 outline-none focus:outline-none rounded-lg bg-[#272758] "
                />
                <FaSearch className="text-xl " />
              </div>
            </div>
          </div>
          <select
            className="bg outline-none focus:outline-none  rounded-lg py-2 px-4"
            name=""
            id=""
          >
            <option className="gradient-text bg-black" value="webdevelopment">
              Admission
            </option>
            <option className="gradient-text" value="graphicdesign">
              Exam batch
            </option>
          </select>
        </div>
        <div className="bg h-[2px] w-full mt-4"></div>
      </div>

      {course?.map((data: any) => (
        <div
          className="flex bg justify-between  items-center mt-4 rounded-lg p-[1px] "
          key={data.id}
        >
          <div className="bg-[#111111] w-full flex md:justify-between md:flex-nowrap justify-center gap-5  flex-wrap items-center p-4 rounded-lg">
            <div>
              <img
                className="w-[200px] rounded-lg h-[150px]"
                src={data.thumbnail}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="montserrat text-[20px] font-bold ">{data.title}</p>
              <p className="montserrat">
                Course Type :{" "}
                <span className="gradient-text font-semibold capitalize">
                  {data.type}
                </span>
              </p>
              <p className="montserrat">
                Total Erolled :{" "}
                <span className="gradient-text font-semibold capitalize">
                  {data.enrolled || 5}
                </span>
              </p>
              <p className="montserrat">
                Course Started :{" "}
                <span className="gradient-text font-semibold capitalize">
                  5 day left
                </span>
              </p>
            </div>
            <div className="flex justify-center gap-5">
              <Link
                to={`/dashboard/course/${data.id}`}
                className="gradient-button py-3 px-5 font-bold "
              >
                Update
              </Link>
              <button className="gradient-button py-3 px-5 font-bold ">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allcourse;
