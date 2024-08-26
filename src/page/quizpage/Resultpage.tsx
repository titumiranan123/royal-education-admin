import React from "react";

const Resultpage: React.FC = () => {
  return (
    <div className="max-w-[1240px] mx-auto ">
      <div className="flex justify-center bg-orange-400 bg-opacity-10 flex-col items-center min-h-screen">
        <div className="round w-36 h-36 rounded-full  flex justify-center items-center border-orange-500 border-[3px]">
          <div className="small_rounded h-28 w-28 rounded-full flex justify-center items-center relative text-xl font-bold   text-black bg-white">
            <p className="z-40">3/10</p>
            <div className="h-28 w-28 absolute bg-orange-500 blur-3xl"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-white justify-center items-center mt-20">
          <p className="text-xl text-orange-500 font-bold">
            Very Disappointing !!!{" "}
          </p>
          <p>
            You have completed the Exam and achieve{" "}
            <span className="text-xl">3</span> Marks !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resultpage;
