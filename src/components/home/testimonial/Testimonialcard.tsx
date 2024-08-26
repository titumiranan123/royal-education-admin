/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import img from "../../../assets/testimonial/user.png";
import { SiComma } from 'react-icons/si';
interface prop {
    data:any
}
const Testimonialcard:React.FC<prop> = ({data}) => {
    return (
        <div className="p-[1px] md:w-[650px] w-full ms-1 bg rounded-lg flex justify-center items-center ">
              <div className="flex px-4 text-white  bg-[#202020] rounded-lg p-2 pb-6 flex-col">
             
                <div className="flex justify-center items-center p-5 flex-col banglafont relative">
                  <div className="text-[16px] ">
                    <div className='flex justify-end absolute right-0 top-1'>
                    <SiComma className='text-white' /> <SiComma className='text-white' />
                    </div>
                    {data.message}
                  
                  </div>
                  <div className="mt-8 flex gap-5 items-center justify-start">
                    <div>
                      <img src={img} alt="" />
                    </div>
                    <div className="">
                      <p className="text-white font-bold text-[14px]">
                        {data.name}
                      </p>
                      <p className="text-white text-[12px]">
                        {data.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
};

export default Testimonialcard;