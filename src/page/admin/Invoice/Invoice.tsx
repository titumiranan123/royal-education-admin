/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useInvoice from "../../../hook/useInvoice";
// import useCourse from "../../../hook/useCourse";
import Swal from "sweetalert2";

const Invoice: React.FC = () => {
  const { data: invoice, refetch } = useInvoice();

  const handleApprove = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/enrollments/${id}/approve`,
          {
            method: "PUT",
          }
        );
        const data = await res.json();

        if (data.success) {
          refetch();
          Swal.fire({
            title: "Approved!",
            text: "Approval done successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to approve",
          icon: "error",
        });
        console.error("Error approving:", error);
      }
    }
  };
  return (
    <div className="min-h-screen mt-32">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead className="text-[18px] border-b border-[#2c285f] bg-[#131129] gradient-text font-semibold uppercase">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 w-[200px] text-center md:text-left"
              >
                UserId
              </th>
              <th
                scope="col"
                className="px-6 w-[200px] py-3 text-center md:text-left"
              >
                CourseId
              </th>
              <th
                scope="col"
                className="px-6 w-[120px] py-3 text-center md:text-left"
              >
                Bkash/Nogod/Roket Number
              </th>
              <th
                scope="col"
                className="px-6 w-[120px] py-3 text-center md:text-left"
              >
                TrxId
              </th>
              <th
                scope="col"
                className="px-6 w-[120px] py-3 text-center md:text-left"
              >
                Permission
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice?.map((info: any) => (
              <>
                <tr className="text-white border-b border-[#2c285f] bg-[#131129]">
                  <td className=" py-4 text-[16px]  text-center md:text-left  w-[200px] ">
                    {info.userId}
                  </td>
                  <td className=" py-4 text-[16px] w-[200px] text-center md:text-left ">
                    {info.enrolled_course_id}
                  </td>
                  <td
                    className=" py-4 text-[16px] w-[120px] text-center md:text-left 
                  "
                  >
                    {info.bkash_number}
                  </td>
                  <td className=" py-4 text-[16px] w-[120px] text-center md:text-left whitespace-nowrap">
                    {info.trxId}
                  </td>

                  <td className=" py-4 text-[16px] w-[120px] text-center md:text-left whitespace-nowrap">
                    {/* {info.approve} */}
                    <button
                      onClick={() => handleApprove(info.id)}
                      className={`gradient-button text-white py-2 px-3 md:px-5 font-semibold text-lg ${
                        info.approve && "opacity-20 disabled"
                      }`}
                    >
                      {!info.approve ? "Approve" : "Approved"}
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
