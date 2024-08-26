import React from "react";
import hero_img from "../../assets/course/hero.jpeg";
const Jobpreparation: React.FC = () => {
  return (
    <div>
      <div className="lg:h-[350px] w-full px-5 bg-[#390645]">
        <div className="max-w-[1340px] mx-auto flex justify-between  py-10 items-center">
          <div className="flex gap-4 flex-col  items-start">
            <h1 className="text-white font-bold text-[34px]">
              HSC 2024 Mission A+ in 45 Day
            </h1>
            <p className="text-white">
              স্বল্প সময়ে এইচএসসির গোছানো প্রস্তুতি নিশ্চিত করতে এখনই ফ্রিতে
              এনরোল করুন।
            </p>
            <button className="text-white gradient-button px-10 py-3 font-bold mt-2">
              Enroll
            </button>
          </div>
          <div>
            <img src={hero_img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobpreparation;
