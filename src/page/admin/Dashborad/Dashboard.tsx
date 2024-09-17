import React from "react";
import { FaGraduationCap, FaSearch } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import CountUp from "react-countup";
import Pricechart from "./Pricechart";
import useCourse from "../../../hook/useCourse";
import useUser from "../../../hook/useUser";

const Dashboard: React.FC = () => {
  const { data: courses } = useCourse();
  const {data:users} = useUser()
  return (
    <div className="">
      <div className="bg p-[2px] md:w-[279px] w-[224px] -mt-8 rounded-lg">
        <div className="text-white bg-[#272758] rounded-lg px-4 md:w-[274px] w-[220px] flex items-center gap-2">
          <input
            type="text"
            placeholder="Search ....."
            className="px-4 py-2 outline-none focus:outline-none w-[70%] md:w-[90%] montserrat  rounded-lg bg-[#272759] "
          />
          <FaSearch className="text-xl " />
        </div>
      </div>
      <div className="bg h-[2px] w-full mt-4"></div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 montserrat  lg:px-10 md:scale-100 scale-90">
          <div className="w-[350px] h-[200px] p-[2px] rounded-lg  mt-5">
            <div className="bg-[#83249b] rounded-lg w-full h-full p-10 flex justify-between items-center">
              <div className=" rounded-full border-white border p-4 flex justify-center items-center">
                <PiUsersThreeBold className="text-white font-bold text-[40px]" />
              </div>
              <div className="flex flex-col gap-1 ">
                <h1 className="text-[20px] font-semibold text-white">
                  TOTAL STUDENT
                </h1>
                <p className="text-[30px] font-bold text-white">
                  <CountUp start={1} enableScrollSpy delay={2} end={users?.length} />
                </p>
                <p className="text-sm text-white">New student Add </p>
              </div>
            </div>
          </div>

          <div className="w-[350px] h-[200px] p-[2px] rounded-lg  mt-5">
            <div className="bg-[#673BB7] rounded-lg w-full h-full p-10 flex justify-between items-center">
              <div className=" rounded-full border-white border p-4 flex justify-center items-center">
                <PiUsersThreeBold className="text-white font-bold text-[40px]" />
              </div>
              <div className="flex flex-col gap-1 ">
                <h1 className="text-[20px] font-semibold uppercase text-white">
                  TOTAL Teacher
                </h1>
                <p className="text-[30px] font-bold text-white">
                  <CountUp enableScrollSpy start={1} delay={2} end={20} />
                </p>
                <p className="text-sm text-white">New Teacher Add </p>
              </div>
            </div>
          </div>
          <div className="w-[350px] h-[200px] p-[2px] rounded-lg  mt-5">
            <div className="bg-[#8d6f0e] rounded-lg w-full h-full p-10 flex justify-between items-center">
              <div className=" rounded-full border-white border p-4 flex justify-center items-center">
                <FaGraduationCap className="text-white font-bold text-[40px]" />
              </div>
              <div className="flex flex-col gap-1 ">
                <h1 className="text-[20px] font-semibold text-white">
                  TOTAL Course
                </h1>
                <p className="text-[30px] font-bold text-white">
                  <CountUp
                    enableScrollSpy
                    start={1}
                    delay={2}
                    end={courses?.length}
                  />
                </p>
                <p className="text-sm text-white">New student Add </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[400px] mt-10 mx-auto w-[90%]">
          <p className="gradient-text font-bold monserat text-[25px] montserrat">
            Daily Payments Chart :{" "}
          </p>
          <Pricechart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
