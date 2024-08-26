/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAngleLeft } from "react-icons/fa";

const PrevA = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className={`absolute top-[50%] translate-y-[-50%] left-1`}
      onClick={onClick}
    >
      <FaAngleLeft className="text-2xl" />
    </div>
  );
};
export default PrevA;
