import React from "react";
import img from "../../assets/heropng.png";
import btn from "../../assets/playbutton.png";
import user from "../../assets/state/user.png"
import man from "../../assets/state/userman.png"
const Header: React.FC = () => {
  return (
    <div className=" pb-32 lg:h-[850px] h-[1200px] relative mx-auto md:px-0 px-5">
      <div className="relative max-w-[1440px] mx-auto ">
        <div className="lg:w-[400px] z-10 bg-opacity-50 h-[400px] bg-[#5C53FE] blur-[106px] absolute"></div>
        <div className="max-w-[1240px] lg:mt-0 mt-20 relative mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="flex justify-center z-20 items-start gap-8 flex-col">
            <div className="font-bold md:text-[48px] text-[32px] ">
              <div className="md:flex hidden   gap-5 ">
                <h1 className="gradient-text lg:leading-[80px]"> সুশিক্ষা</h1>
                <h1 className="text-white lg:leading-[80px]">এবং</h1>
                <h1 className="gradient-text lg:leading-[80px]">ক্যারিয়ার</h1>
                <h1 className="text-white lg:leading-[80px]">গঠনে</h1>
              </div>
              <div className="lg:hidden flex  gap-5 ">
                <h1 className="gradient-text lg:leading-[70px]"> সুশিক্ষা</h1>
                <h1 className="text-white lg:leading-[70px]">এবং</h1>{" "}
                <h1 className="gradient-text lg:leading-[70px]">ক্যারিয়ার</h1>{" "}
              </div>
              <h1 className="text-white  lg:leading-[70px]">
                <span className="md:hidden">গঠনে</span> আমরা আছি আপনার পাশে
              </h1>
            </div>
            <div className="text-white text-opacity-80 -mt-5">
              Royal Education-এর সাথে আপনার শুরু হোক জ্ঞানরাজ্যে পথচলা । আমাদের
              প্রিমিয়াম কোর্স এবং বিশেষজ্ঞ দিকনির্দেশনা আপনার শিক্ষার
              সম্ভাবনাকে নতুন উচ্চতায় নিয়ে যাবে। আজই যোগ দিন এবং আপনার
              ভবিষ্যতকে আলোকিত করুন।
            </div>
            <div className="flex md:gap-6 gap-2 mt-5">
              <button className="gradient-button text-white w-[150px] h-[50px]">
                Enroll Now
              </button>
              <button className="flex justify-center items-center md:gap-4 gap-2 ">
                <img
                  className="md:w-[51px] md:h-[51px] w-[40px] h-auto"
                  src={btn}
                  alt=""
                />
                <span className="md:text-[18px] text-[16px] text-white text-nowrap leading-[20px] text-center underline font-[600]">
                  See Our Courses
                </span>
              </button>
            </div>
          </div>
          <div>
            <img
              className="lg:w-[692px] w-full h-full lg:h-[695px]"
              src={img}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="bg w-full lg:h-[158px] absolute left-0 bottom-14  md:p-0 p-10 ">
        <div className="flex justify-between items-center flex-wrap lg:flex-nowrap max-w-[1240px] gap-5 my-auto lg:h-[158px] mx-auto">
        <div className="flex   lg:w-1/4 w-full  relative">
            <img className="top-0 flip-horizontal   h-[158px]" src={user} alt="" /> 
            <img className="absolute flip-horizontal  top-2 left-4 h-[150px] " src={man} alt="" /> 
          </div>
          <div className="flex flex-col justify-center lg:w-1/4 w-full items-center">
            <div className="text-[48px] font-black leading-[60px] text-white">
              10 K+
            </div>
            <p className="font-bold text-[28px] text-white">Students</p>
          </div>
          <div className="flex lg:w-1/4 w-full flex-col justify-center items-center">
            <div className="text-[48px]  font-black leading-[60px] text-white">
              30 +
            </div>
            <p className="font-bold text-[28px] text-white">Teacher</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Header;
