import React from "react";
import hero_img from "../../assets/course/hero.jpeg";
import Admissioncourselist from "../../components/admissioncoursepage/Admissioncourselist";

const Allcourses: React.FC = () => {
  return (
    <div className=" mx-auto">
      <div className="lg:h-[350px] w-full px-5  bg-[#390645]">
        <div className="max-w-[1320px] mx-auto flex justify-between  py-10 items-center">
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
      <div className="mt-10 max-w-[1320px] mx-auto">
        <div>
          <p className="text-[28px] text-white mb-10 font-bold">
            ভর্তি পরীক্ষার প্রস্তুতির জন্য লাইভ কোর্স :
          </p>
        </div>
        <Admissioncourselist />
      </div>
      <div className="mt-10 max-w-[1320px] mx-auto">
        <div>
          <p className="text-[28px] text-white mb-10 font-bold">
            শুন্য থেকে জব প্রস্তুতির সকল কোর্স :
          </p>
        </div>
        <Admissioncourselist />
      </div>
      <div className="flex justify-center items-center">
        <button className="gradient-button mt-10 flex justify-center items-center text-white font-bold monserrat py-2 px-4">
          See More
        </button>
      </div>
    </div>
  );
};

export default Allcourses;
