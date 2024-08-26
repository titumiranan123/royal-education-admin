import React from "react";
import { Link } from "react-router-dom";

type datainfo = {
  _id: number;
  thumbnail: string;
  title: string;
  price: string;
  course_route: string;
};

interface coursedataProp {
  data: datainfo;
}

const Enrolledcoursecard: React.FC<coursedataProp> = ({ data }) => {
  return (
    <div className="w-[600px] md:flex bg-[#1C1A29] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="md:flex-shrink-0">
        <img
          className="md:h-[220px] w-full  md:w-[300px]"
          src={data.thumbnail}
          alt={data.title}
        />
      </div>
      <div className="p-6 flex flex-col justify-between">
        <h1 className="text-white text-xl font-bold">{data.title}</h1>
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: "90%" }} // Full progress
            ></div>
          </div>
          <p className="text-green-400 text-right text-sm font-semibold mt-2">
            100% Completed
          </p>
        </div>
        <div className="mt-6 flex justify-between">
          <Link to={`/mydashboard/${data.course_route}/videos`}>
            <button className="bg-gradient-to-r from-purple-800 to-pink-700 text-white py-2 px-4 rounded-md text-sm font-semibold transition-transform duration-200 hover:scale-105">
              Continue Course
            </button>
          </Link>
          <Link to={`/mydashboard/${data.course_route}/outline`}>
            <button className="bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-semibold transition-transform duration-200 hover:scale-105">
              Outline
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Enrolledcoursecard;
