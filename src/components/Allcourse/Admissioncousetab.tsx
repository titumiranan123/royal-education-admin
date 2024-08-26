import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCourse from "../../hook/useCourse";
import NextArrow from "../home/slickbutton/NextArror";
import PrevArrow from "../home/slickbutton/category/PrevArrow";

// Define an interface for your course data
interface Course {
  id: number;
  title: string;
  thumbnail: string;
}

const Admissioncousetab: React.FC = () => {
  const { data } = useCourse();


  const showArrows = data?.length > 4;

  const settings = {
    infinite: false,
    speed: 500,
    padding:"50",
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: showArrows ? <NextArrow /> : undefined,
    prevArrow: showArrows ? <PrevArrow /> : undefined,
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
    <div className="max-w-[1240px] mx-auto mt-20">
      <Slider {...settings} className="text-white">
        {data?.map((course: Course) => (
          <div
            key={course.id}
            className="p-[1px] ms-4 bg lg:w-[295px] w-[340px] rounded-lg"
          >
            <div className="flex bg-[#201E35] rounded-lg p-2 pb-6 flex-col">
              <img
                src={course.thumbnail}
                className="rounded-lg h-auto w-full"
                alt="Course Thumbnail"
              />
              <div className="mt-4">
                <p className="text-white font-bold text-2xl">{course.title}</p>
                <p className="gradient-text text-xl font-semibold mt-4 text-[16px]">
                  Coming soon
                </p>
                <Link to={`product/${course.id}`} className="mt-4">
                  <span className="flex items-center text-sm font-semibold text-[#a15cf0]">
                    <span className="mt-1 banglafont font-semibold">
                      বিস্তারিত
                    </span>
                    <span className="text-[#12f55e] animate-moveRight ms-4">
                      <FaArrowRight />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Admissioncousetab;
