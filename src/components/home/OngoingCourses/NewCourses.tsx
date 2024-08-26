import React, { useState } from "react";
import Heading from "../../shared/Heading";

import GradientCard from "../../utils/Gradient_card";

const NewCourses: React.FC = () => {
  const [active, setIndex] = useState(1);
  console.log(active);
  return (
    <div className="mt-40 max-w-[1240px] overflow-hidden h-[530px]  mx-auto border border-red-500">
      <div className="relative h-[170px] lg:px-0 px-2">
        <div className="z-50 absolute lg:left-[18%] md:left-[19%]">
          <Heading
            title="নতুন কোর্স "
            description="এখনই এনরোল করো তোমার প্রয়োজনীয় কোর্স "
          />
        </div>
        <div className="lg:w-[900px] md:w-[500px] w-[300px] z-10 bg-opacity-50 md:h-[200px] h-[250px] bg-[#5C53FE] blur-[106px] left-[13%] -top-[30%] absolute"></div>
      </div>
      <div>
        <div>
          <div id="tablist" className="flex justify-center gap-2 items-center">
            <div id="tabs" onClick={() => setIndex(1)}>
              {active === 1 ? (
                <GradientCard
                  className="w-[80px]  h-[40px]"
                  childClass="w-[77px] h-[36px] flex justify-center items-center h-10"
                >
                  {" "}
                  <div className="gradient-text font-bold text-[18px]">SSC</div>
                </GradientCard>
              ) : (
                <div className="text-[20px] font-[500] text-white w-[80px]  h-[40px] flex justify-center items-center">
                  SSC
                </div>
              )}
            </div>
            <div onClick={() => setIndex(2)}>
              {active === 2 ? (
                <GradientCard
                  className="w-[80px]  h-[40px]"
                  childClass="w-[77px] h-[36px] flex justify-center items-center h-10"
                >
                  {" "}
                  <div className="gradient-text font-bold text-[18px]">HSC</div>
                </GradientCard>
              ) : (
                <div className="text-[20px] font-[500] text-white w-[80px]  h-[40px] flex justify-center items-center ">
                  HSC
                </div>
              )}
            </div>
            <div onClick={() => setIndex(3)}>
              {" "}
              {active === 3 ? (
                <GradientCard
                  className="w-[110px]  h-[40px]"
                  childClass="w-[107px] h-[36px] flex justify-center items-center h-10"
                >
                  {" "}
                  <div className="gradient-text font-bold text-[18px] w-[100px]  h-[40px]flex justify-center items-center text-center ">
                    Admission
                  </div>
                </GradientCard>
              ) : (
                <div className="text-[20px] font-[500] text-white w-[110px]  h-[40px] flex justify-center items-center">
                  Admission
                </div>
              )}
            </div>
            <div onClick={() => setIndex(4)}>
              {active === 4 ? (
                <GradientCard
                  className="w-[80px]  h-[40px]"
                  childClass="w-[77px] h-[36px] flex justify-center items-center h-10"
                >
                  {" "}
                  <div className="gradient-text font-bold text-[18px]">Job</div>
                </GradientCard>
              ) : (
                <div className="text-[20px] font-[500] text-white w-[80px]  h-[40px] flex justify-center items-center">
                  Job
                </div>
              )}
            </div>
          </div>
          <div className="tabdata mt-10">
            {active === 1 && (
              <div>
                {" "}
                <GradientCard className="" childClass="">
                  {" "}
                  ssc
                </GradientCard>{" "}
              </div>
            )}
            {active === 2 && (
              <div>
                {" "}
                <GradientCard className="" childClass="">
                  {" "}
                  hsc
                </GradientCard>{" "}
              </div>
            )}
            {active === 3 && (
              <div>
                {" "}
                <GradientCard className="" childClass="">
                  {" "}
                  addmission
                </GradientCard>{" "}
              </div>
            )}
            {active === 4 && (
              <div>
                {" "}
                <GradientCard className="" childClass="">
                  {" "}
                  job
                </GradientCard>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourses;
