import React, { useState } from "react";
import useCourse from "../../hook/useCourse";
import Heading from "../shared/Heading";
import Admission from "../home/admission/Admission";
import Admissioncousetab from "./Admissioncousetab";

const Coursestab: React.FC = () => {
  const { data } = useCourse();
  const [activeTab, setActiveTab] = useState<string>("Admission");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="md:mt-[120px] md:mb-[120px]">
        <Heading title="Top Class Course" description="Explore Our  Best Courses" />
      <div>
        <div className="border-b-[1px] mt-20 w-[300px] mx-auto relative">
         <div className="grid absolute left-4 -bottom-[2px] grid-flow-col w-[300px] mx-auto text-center  h-[58px]">
         {["Admission", "HSC", "SSC"].map((tab) => (
            <button
              key={tab}
              className={` border-b-[4px] rounded-b-md  w-[80px] flex justify-center items-center ${
                activeTab === tab
                  ? "text-indigo-600 border-indigo-600"
                  : "text-white border-transparent hover:text-indigo-600 hover:border-indigo-600"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
         </div>
        </div>
      </div>
      <div className="p-2">
        {activeTab === "Admission" && (
          <Admissioncousetab />
        )}
        {activeTab === "HSC" && (
          <div>
            <h2>HSC Courses</h2>
            {data?.hsc?.map((course: any) => (
              <p key={course.id}>{course.name}</p>
            ))}
          </div>
        )}
        {activeTab === "SSC" && (
          <div className="flex mt-20 justify-center items-center text-2xl montserrat text-white">
            Coming soon
          </div>
        )}
      </div>
    </div>
  );
};

export default Coursestab;
