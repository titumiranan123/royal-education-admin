// CardSlider.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img from "../../assets/course.png";

import NextA from "./NextA";
import PrevA from "./PrevA";

const Coursedetailscarusel: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextA />,
    prevArrow: <PrevA />,
  };

  return (
    <div className=" mx-auto mt-20">
      <Slider {...settings} className="text-white ">
        <div className="p-4">
          <div className="flex justify-center items-center p-2 flex-col">
            <img
              src={img}
              className=" w-[280px] md:w-[326px] h-[256px]"
              alt=""
            />
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center items-center p-2 flex-col">
            <img
              src={img}
              className="w-[280px] md:w-[326px] h-[256px]"
              alt=""
            />
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center items-center p-2 flex-col">
            <img
              src={img}
              className="w-[280px] md:w-[326px] h-[256px]"
              alt=""
            />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Coursedetailscarusel;
