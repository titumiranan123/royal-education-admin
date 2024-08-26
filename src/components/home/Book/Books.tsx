import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GradientCard from "../../utils/Gradient_card";
import img from "../../../assets/testimonial/bupBooster.png";
import fundamental from "../../../assets/testimonial/fundamentalGk.png";
import gk from "../../../assets/testimonial/khondokargk.png";
import Heading from "../../shared/Heading";
import NextArrow from "../slickbutton/NextArror";
import PrevArrow from "../slickbutton/PrevArrow";
const Books: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
          dots: true,
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
    <div className="max-w-[1240px] mx-auto mt-32">
      <div>
        <Heading
          title="বই সমূহ "
          description="ভর্তি পরীক্ষা ও সরকারি চাকরির সহায়ক বই সমূহ "
        />
      </div>
      <Slider {...settings} className="text-white mt-20">
        <div className="p-4">
          <GradientCard
            className="w-[387px] h-[534px] "
            childClass="w-[384px] h-[531px] "
          >
            <div className="flex justify-center items-center p-5 flex-col">
              <img src={img} className="w-[346px] h-[376px]" alt="" />
              <div className="mt-8">
                <p className="text-white font-bold text-[20px]">Course Name</p>
                <p className="text-white text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  quidem rem ex!
                </p>
              </div>
            </div>
          </GradientCard>
        </div>
        <div className="p-4">
          <GradientCard
            className="w-[387px] h-[534px] "
            childClass="w-[384px] h-[531px] "
          >
            <div className="flex justify-center items-center p-5 flex-col">
              <img src={fundamental} className="w-[346px] h-[376px]" alt="" />
              <div className="mt-8">
                <p className="text-white font-bold text-[20px]">Course Name</p>
                <p className="text-white text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  quidem rem ex!
                </p>
              </div>
            </div>
          </GradientCard>
        </div>
        <div className="p-4">
          <GradientCard
            className="w-[387px] h-[534px] "
            childClass="w-[384px] h-[531px] "
          >
            <div className="flex justify-center items-center p-5 flex-col">
              <img src={gk} className="w-[346px] h-[376px]" alt="" />
              <div className="mt-8">
                <p className="text-white font-bold text-[20px]">Course Name</p>
                <p className="text-white text-[16px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  quidem rem ex!
                </p>
              </div>
            </div>
          </GradientCard>
        </div>
      </Slider>
    </div>
  );
};

export default Books;
