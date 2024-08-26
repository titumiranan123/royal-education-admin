/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaMinus } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

interface Props {
  active: number;
  setActive: (courseData: any) => void;
  benefits: { title: string }[];
  setBenefit: (benefits: { title: string }[]) => void;
  courseDetails: { title: string; description: string }[];
  setDetails: (courseDetails: { title: string; description: string }[]) => void;
}

const CourseData: React.FC<Props> = ({
  benefits,
  setBenefit,
  active,
  setActive,
  setDetails,
  courseDetails,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = { title: value };
    setBenefit(updatedBenefits);
  };
  console.log(courseDetails);
  const handleAddBenefit = () => {
    setBenefit([...benefits, { title: "" }]);
  };
  const handleAddCourseDetails = () => {
    setDetails([...courseDetails, { title: "", description: "" }]);
  };
  const handleRemoveCourseDetails = (index: number) => {
    setDetails(courseDetails.filter((_, idx) => idx !== index));
  };
  return (
    <div className="bg p-[3px] rounded-xl mt-24">
      <div className=" bg-[#0D0C11] p-5 m-auto  rounded-xl block">
        <div>
          <label className="text-2xl font-bold gradient-text" htmlFor="">
            What you will learn by doing the course ?
          </label>
          <br />
          <div className="flex flex-col gap-4 mt-5">
            {benefits.map((benefit: { title: string }, index: number) => (
              <input
                type="text"
                key={index}
                className="py-2 px-2 outline-none rounded-lg w-full"
                placeholder="What you will learn by doing the course ?"
                required
                value={benefit.title}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
              />
            ))}
          </div>
          <MdAddCircle
            className="text-2xl mt-5 text-white"
            onClick={handleAddBenefit}
          />
        </div>
        <div className="mt-10">
          <label className="text-2xl font-bold gradient-text" htmlFor="">
            Details about the course ???
          </label>
          <div>
            <div className="flex flex-col gap-4 mt-5">
              {courseDetails.map(
                (
                  details: { title: string; description: string },
                  index: number
                ) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <input
                      type="text"
                      className="py-2 px-2 outline-none rounded-lg w-full"
                      placeholder="What you will learn by doing the course ?"
                      required
                      value={details.title}
                      onChange={(e) => {
                        const updateDetails = [...courseDetails];
                        updateDetails[index].title = e.target.value;
                        setDetails(updateDetails);
                      }}
                    />
                    <textarea
                      className="py-2 px-2 outline-none rounded-lg w-full h-[200px]"
                      placeholder="What you will learn by doing the course ?"
                      required
                      value={details.description}
                      onChange={(e) => {
                        const updateDetails = [...courseDetails];
                        updateDetails[index].description = e.target.value;
                        setDetails(updateDetails);
                      }}
                    ></textarea>
                    {index !== 0 && (
                      <FaMinus
                        className="text-white"
                        onClick={() => handleRemoveCourseDetails(index)}
                      />
                    )}
                  </div>
                )
              )}
            </div>
            <MdAddCircle
              className="text-2xl mt-5 cursor-pointer text-white"
              onClick={handleAddCourseDetails}
            />
          </div>
        </div>
        <div className="flex justify-between mt-10 items-center">
          <input
            type="submit"
            onClick={() => setActive(active - 1)}
            value="Prev"
            className="btn w-[180px]"
          />
          <input
            type="submit"
            onClick={() => setActive(active + 1)}
            value="Next"
            className="btn w-[180px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseData;
