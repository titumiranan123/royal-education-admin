/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAngleRight } from "react-icons/fa";
import GradientCard from "../../../utils/Gradient_card";

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className={`absolute lg:hidden top-[50%] flex  translate-y-[-50%] left-1 md:left-6 z-20 lg:-left-10`}
      onClick={onClick}
    >
      <GradientCard
        className="w-10 h-10"
        childClass="w-9 h-9 flex justify-center items-center"
      >
        {" "}
        <FaAngleRight className="text-2xl" />
      </GradientCard>
    </div>
  );
};
export default PrevArrow;
