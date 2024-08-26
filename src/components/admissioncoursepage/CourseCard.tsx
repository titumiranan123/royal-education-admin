import React from "react";
import { Link } from "react-router-dom";

type datainfo = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: string;
};
interface coursedataProp {
  data: datainfo;
}
const CourseCard: React.FC<coursedataProp> = ({ data }) => {
  return (
    <div className="hover:bg-gradient-to-tr from-[#DC02CE] to-[#5C53FE] transition-all ease-in-out duration-300   w-[302px] flex justify-center items-center bg-[#52504e] group p-[1px] rounded-lg">
      <div className="flex   w-[300px] bg-[#0D0C11] h-full flex-col gap-4 rounded-lg">
        <img
          className="w-[300px] rounded-lg h-[200px]"
          src={data.thumbnail}
          alt=""
        />
        <div className="px-4 pb-3">
          <h1 className="text-white leading-[35px] noto-sans-bengali font-semibold text-[24px]">
            {data.title}
          </h1>
          <p className="text-white banglafont font-bold text-[20px] mt-2">
            <span className="text-white font-bold text-[20px]">৳</span>{" "}
            {data.price}
          </p>
          <Link to={`/admission/${data.id}`}>
            <button className="montserrat py-3 gradient-text text-xl font-bold mt-2">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
