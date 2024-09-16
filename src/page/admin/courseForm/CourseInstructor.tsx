/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";

interface instructorPorp {
  instructor: {
    img: string;
    name: string;
    experience: string;
    institute: string;
  }[];
  setInstructor: (
    instructor: {
      img: string;
      name: string;
      experience: string;
      institute: string;
    }[]
  ) => void;
  handleSubmit: any;
  active: number;
  setActive: (courseData: any) => void;
}

const CourseInstructor: React.FC<instructorPorp> = ({
  setInstructor,
  instructor,
  handleSubmit,
  active,
  setActive,
}) => {
  const addInstructor = () => {
    setInstructor([
      ...instructor,
      {
        img: "",
        name: "",
        experience: "",
        institute: "",
      },
    ]);
  };

  const [dragging, setDragging] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const updatedInstructors = [...instructor];
          updatedInstructors[index].img = reader.result as string;
          setInstructor(updatedInstructors);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, index: number) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedInstructors = [...instructor];
        updatedInstructors[index].img = reader.result as string;
        setInstructor(updatedInstructors);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg p-[3px] rounded-xl mt-24">
      <div className="bg-[#0D0C11] p-5 m-auto rounded-xl block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {instructor.map((data, index) => (
            <div className="bg p-[1px] rounded-xl mt-10" key={index}>
              <div className="bg-[#0D0C11] p-5 m-auto rounded-xl">
                <div className="bg p-[1px] rounded-xl">
                  <div className="bg-[#0D0C11] rounded-xl h-[200px] flex justify-center items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                      name={`file-${index}`}
                      id={`file-${index}`}
                      className="hidden"
                    />
                    <label
                      htmlFor={`file-${index}`}
                      className={`w-full p-3 flex items-center justify-center ${
                        dragging ? "bg-blue-500" : "bg-transparent"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      {data.img ? (
                        <img
                          src={data.img}
                          className="w-[200px] h-[200px] rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white">
                          Drag and drop your thumbnail here or click to browse
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-white me-2 font-semibold text-xl flex w-[30%] mt-2 mb-2 montserrat ">
                    Name:
                  </label>
                  <input
                    value={data.name}
                    placeholder="Name"
                    className="py-2 px-2 montserrat font-semibold outline-none rounded-lg w-full mt-2"
                    onChange={(e) => {
                      const updatedInstructor = [...instructor];
                      updatedInstructor[index].name = e.target.value;
                      setInstructor(updatedInstructor);
                    }}
                  />
                </div>
                <div>
                  <label className="text-white me-2 font-semibold text-xl flex w-[30%] mt-2 mb-2 montserrat ">
                    Experience:
                  </label>
                  <input
                    value={data.experience}
                    placeholder="Experience"
                    className="py-2 px-2 outline-none rounded-lg w-full montserrat font-semibold"
                    onChange={(e) => {
                      const updatedInstructor = [...instructor];
                      updatedInstructor[index].experience = e.target.value;
                      setInstructor(updatedInstructor);
                    }}
                  />
                </div>
                <div>
                  <label className="text-white me-2 font-semibold text-xl flex w-[30%] mt-2 mb-2 montserrat ">
                    Institute:
                  </label>
                  <input
                    value={data.institute}
                    placeholder="Institute"
                    className="py-2 px-2 outline-none rounded-lg w-full montserrat font-semibold"
                    onChange={(e) => {
                      const updatedInstructor = [...instructor];
                      updatedInstructor[index].institute = e.target.value;
                      setInstructor(updatedInstructor);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <MdAddCircle
          className="text-2xl mt-5 text-white"
          onClick={addInstructor}
        />
        <div className="flex justify-between mt-10 items-center">
          <input
            type="submit"
            onClick={() => setActive(active - 1)}
            value="Prev"
            className="btn w-[180px] montserrat"
          />
          <button
    
            onClick={() => handleSubmit()}
          
            className="btn w-[180px] montserrat"
          >Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructor;
