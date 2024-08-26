/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAngleRight } from "react-icons/fa";
import GradientCard from "../../../utils/Gradient_card";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`absolute lg:hidden top-[50%] flex  translate-y-[-50%] right-1 md:right-6 lg:-right-9`}
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
export default NextArrow;
