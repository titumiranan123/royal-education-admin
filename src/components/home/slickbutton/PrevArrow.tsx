/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAngleRight } from "react-icons/fa";
import GradientCard from "../../utils/Gradient_card";

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className={`absolute top-[50%] md:block hidden translate-y-[-50%] lg:-left-10 left-1 z-30 `}
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
