import React, { useState } from "react";

const Accordion: React.FC<{ title: string; content: React.ReactNode }> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" mb-2 ">
      <div
        className="flex justify-between items-center bg-[#160929]  p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-[20px] cursor-pointer text-violet-gradient font-bold ">
          {title}
        </h2>
        <svg
          className={`w-6 h-6 text-[#a13aaa] ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </div>
      {isOpen && <div className="p-2 cursor-pointer">{content}</div>}
    </div>
  );
};

export default Accordion;
