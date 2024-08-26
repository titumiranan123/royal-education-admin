// CardSlider.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Heading from "../../shared/Heading";
import NextArrow from "../slickbutton/NextArror";
import PrevArrow from "../slickbutton/PrevArrow";
import { ssc } from "../../../demodata/Course";
import { FaArrowRight } from "react-icons/fa";
const Academy: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 820,
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
    <div className="max-w-[1240px] mx-auto mt-32 ">
      <div className="relative h-[180px] lg:px-0 px-2">
        <div className="z-50 absolute lg:left-[30%] md:left-[19%]">
          <Heading
            title="SSC & HSC"
            description="SSC ও HSC শিক্ষার্থীদের জন্য"
          />
        </div>
        <div className="lg:w-[900px] md:w-[500px] w-[300px] z-10 bg-opacity-50 md:h-[200px] h-[250px] bg-[#5C53FE] blur-[106px] left-[13%] -top-[30%] absolute"></div>
      </div>
      <Slider {...settings} className="text-white mt-0">
        {ssc.map((data) => (
          <>
            <div className="p-[1px] ms-1 bg lg:w-[295px] w-[340px] rounded-lg">
              <div className="flex bg-[#201E35] rounded-lg p-2 pb-6 flex-col">
                <img
                  src={data.thumbnail}
                  className="rounded-lg h-auto w-full"
                  alt="Course Thumbnail"
                />
                <div className="mt-4">
                  <p className="text-white font-bold text-2xl">{data.title}</p>
                  <p className="gradient-text text-xl font-semibold mt-4 text-[16px]">
                    Coming soon
                  </p>
                  <div className="mt-4">
                    <span className="flex items-center text-sm font-semibold text-[#a15cf0]">
                      <span className="mt-1 banglafont font-semibold">
                        বিস্তারিত
                      </span>
                      <span className="text-[#12f55e] animate-moveRight ms-4">
                        <FaArrowRight />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </Slider>
    </div>
  );
};

export default Academy;
