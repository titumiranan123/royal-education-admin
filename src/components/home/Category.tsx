// CardSlider.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GradientCard from "../utils/Gradient_card";
import ssc from "../../assets/category/ssc.png";
import hsc from "../../assets/category/hsc.png";
import admission from "../../assets/category/admission.png";
import job from "../../assets/category/job.png";
import Heading from "../shared/Heading";

import { FaArrowRight } from "react-icons/fa";
import NextArrow from "./slickbutton/category/NextArror";
import PrevArrow from "./slickbutton/category/PrevArrow";
const CardSlider: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-[1240px] mx-auto mt-20">
      <div className="relative h-[180px] lg:px-0 px-2">
        <div className="z-50 absolute lg:left-[25%] md:left-[8%]">
          <Heading
            title="সকল কোর্স"
            description="এনরোল কর  তোমার   পছন্দের কোর্সটি "
          />
        </div>
        <div className="lg:w-[900px] md:w-[500px] w-[300px] z-10 bg-opacity-50 md:h-[200px] h-[250px] bg-[#5C53FE] blur-[106px] left-[13%] -top-[30%] absolute"></div>
      </div>

      <Slider {...settings} className="text-white mt-0 relative">
        <div className="p-4 md:scale-100 scale-90">
          <GradientCard
            className="lg:w-[285px] h-[300px]  w-[340px] "
            childClass="lg:w-[282px] h-[297px]   w-[337px]"
          >
            <div className="flex justify-center items-center p-5 flex-col">
              <img src={ssc} className="w-[106px]  h-[106px]  " alt="" />
              <div className="mt-0 flex justify-center items-center gap-2 flex-col">
                <p className="text-white font-bold text-[20px] montserrat">
                  SSC
                </p>
                <p className="text-white text-[16px] mt-3  flex justify-center items-center ">
                  <p className="montserrat font-semibold">
                    {" "}
                    SSC এর সকল কোর্স সম্পর্কে জানতে ক্লিক করুন{" "}
                  </p>
                  <span>
                    <FaArrowRight className="text-[18px] animate-moveRight w-7 text-[#9b0eec]" />
                  </span>
                </p>
              </div>
            </div>
          </GradientCard>
        </div>

        <div className="p-4 md:scale-100 scale-90">
          <GradientCard
            className="lg:w-[285px] h-[300px]  w-[340px] "
            childClass="lg:w-[282px] h-[297px]   w-[337px]"
          >
            <div className="flex justify-center items-center p-5 flex-col">
              <img src={hsc} className="w-[106px]  h-[106px]  " alt="" />
              <div className="mt-0 flex justify-center items-center gap-2 flex-col">
                <p className="text-white font-bold text-[20px] montserrat">
                  HSC
                </p>
                <p className="text-white text-[16px] mt-4  montserrat font-semibold flex justify-center items-center">
                  <p> HSC এর সকল কোর্স সম্পর্কে জানতে ক্লিক করুন </p>
                  <FaArrowRight className="text-2xl animate-moveRight w-7 text-[#9b0eec]" />
                </p>
              </div>
            </div>
          </GradientCard>
        </div>
        <div className="p-4 md:scale-100 scale-90">
          <GradientCard
            className="lg:w-[285px] h-[300px]  w-[340px] "
            childClass="lg:w-[282px] h-[297px]   w-[337px]"
          >
            <div className="flex justify-center items-center p-5 flex-col">
              <img src={admission} className="w-[106px]  h-[106px]  " alt="" />
              <div className="mt-0 flex justify-center items-center gap-2 flex-col">
                <p className="text-white font-bold montserrat text-[20px]">
                  Admission
                </p>
                <p className="text-white text-[16px] flex justify-center items-center mt-3  ">
                  <p className="montserrat font-semibold">
                    Admission এর সকল কোর্স সম্পর্কে জানতে ক্লিক করুন{" "}
                  </p>
                  <FaArrowRight className="text-2xl animate-moveRight w-7 text-[#9b0eec]" />
                </p>
              </div>
            </div>
          </GradientCard>
        </div>
        <div className="p-4 md:scale-100 scale-90">
          <GradientCard
            className="lg:w-[285px] h-[300px]  w-[340px] "
            childClass="lg:w-[282px] h-[297px]   w-[337px]"
          >
            <div className="flex justify-center items-center p-5 flex-col">
              <img src={job} className="w-[106px]  h-[106px]  " alt="" />
              <div className="mt-0 flex justify-center items-center gap-2 flex-col">
                <p className="text-white font-bold text-[20px] montserrat">
                  Job
                </p>
                <p className="text-white mt-3 flex justify-center items-center text-[16px] font-semibold montserrat">
                  <p className="font-semibold montserrat">
                    Job এর সকল কোর্স সম্পর্কে জানতে ক্লিক করুন{" "}
                  </p>
                  <FaArrowRight className="text-2xl animate-moveRight w-7 text-[#9b0eec]" />
                </p>
              </div>
            </div>
          </GradientCard>
        </div>
      </Slider>
    </div>
  );
};

export default CardSlider;
