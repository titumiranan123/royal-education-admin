import React from "react";
interface prp {
  title: string;
  description: string;
}
const Heading: React.FC<prp> = ({ title, description }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <p className="font-bold text-[20px]  gradient-text text-center">
        {title}
      </p>
      <p className="md:text-[36px] text-[26px] font-bold text-white text-center">
        {description}
      </p>
    </div>
  );
};

export default Heading;
