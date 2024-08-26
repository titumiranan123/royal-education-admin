import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination ,EffectFade} from 'swiper/modules';
import 'swiper/css/effect-fade';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { testimonial } from "../../../demodata/Course";
import Testimonialcard from "./Testimonialcard";

const Testimonial: React.FC = () => {
  return (
    <div className=" mt-32 bg-[#13121C] py-10"> 

    <div className="max-w-[1240px] mx-auto  ">
      <div className="flex  items-center">
        
        {/* Left Section */}
        <div className="lg:w-[40%] space-y-6 text-white">
          <h1 className="gradient-text text-[34px] font-bold leading-[42.2px]">
             শিক্ষার্থী ও <mark>অভিভাবকগণের</mark> মতামত
          </h1>
          <p className="text-[16px]  leading-[25.5px]">
            আমরা সবসময় আমাদের শিক্ষার্থীদের সর্বোচ্চ মানের শিক্ষাদান করি যাতে তারা সবকিছু গভীরভাবে বুঝতে পারে।
          </p>
          <button className="btn py-2 px-4 rounded-lg">Enroll Now</button>
        </div>
        
        {/* Right Section */}
        <div className="w-[60%]">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination,EffectFade]}
            className="mySwiper"
          >
            {
              testimonial.map((p, index) => (
                <SwiperSlide key={index}>
                  <Testimonialcard data={p} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Testimonial;
