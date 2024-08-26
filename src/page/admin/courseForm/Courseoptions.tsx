/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type props = {
  active: number;
  setActive: (active: number) => void;
};
const options = [
  "Course Information",
  "Course Options",
  "Course Content",
  "Course Video ",
  "Course Exam",
  "Course Preview",
];
const Courseoptions: React.FC<props> = ({ active }) => {
  return (
    <div>
      {options.map((option: any, index: number) => (
        <div key={index} className="w-full flex py-5">
          <div
            className={`flex items-center justify-center ${
              active + 1 > index
                ? "bg rounded-full w-[35px] h-[35px]"
                : "bg-slate-300 rounded-full w-[35px] h-[35px]"
            } relative`}
          >
            <IoMdCheckmark className="text-[25px]" />

            {index !== options.length && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg" : "bg-slate-400"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h4
            className={`pl-3 montserrat ${
              active === index
                ? "gradient-text font-semibold montserrat"
                : "text-slate-400"
            } text-[20px]`}
          >
            {option}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Courseoptions;
