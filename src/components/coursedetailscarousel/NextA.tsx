/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAngleRight } from "react-icons/fa";

const NextA = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`absolute top-[50%] translate-y-[-50%] right-2`}
    >
      <FaAngleRight className="text-2xl" />
    </div>
  );
};
export default NextA;
