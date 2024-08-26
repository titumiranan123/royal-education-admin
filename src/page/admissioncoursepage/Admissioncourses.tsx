import React from "react";
import hero_img from "../../assets/course/hero.jpeg";
import Testimonial from "../../components/home/testimonial/Testimonial";
import Admissioncourselist from "../../components/admissioncoursepage/Admissioncourselist";
const Admissioncourses: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="lg:h-[350px] w-full px-5  bg-[#390645]">
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
      <div className="max-w-[1340px] px-4 mx-auto mt-10">
        <div>
          <p className="text-[28px] text-white mb-10 font-bold">
            লাইভ কোর্সসমূহ
          </p>
        </div>
        <Admissioncourselist />
      </div>
      <div className="mt-10">
        <Testimonial />
      </div>
    </div>
  );
};

export default Admissioncourses;
