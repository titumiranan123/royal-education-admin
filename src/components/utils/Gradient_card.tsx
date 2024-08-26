import React, { ReactNode } from "react";

interface GradientCardProps {
  className?: string;
  children: ReactNode;
  childClass: string;
}

const GradientCard: React.FC<GradientCardProps> = ({
  className,
  children,
  childClass,
}) => {
  return (
    <div
      className={`bg relative   rounded-[10px]   ${
        className ? className : "h-[304px] w-[274px]"
      }`}
    >
      <div
        className={`bg-[#201E35] absolute  rounded-[10px]   top-[2px] left-[2px] ${
          childClass ? childClass : "h-[300px] w-[270px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientCard;
