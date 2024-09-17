/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useInvoice from "../../../hook/useInvoice";
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

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: any = await res.json();
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
        console.error("Error approving:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to approve",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white gradient-text">
            Invoice Management
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Review and approve pending enrollments for various courses.
          </p>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full border-separate border-spacing-0">
            <thead className="text-[18px] border-b border-[#2c285f] bg-[#131129] gradient-text font-semibold uppercase">
              <tr>
                <th className="px-6 py-3 text-center">User ID</th>
                <th className="px-6 py-3 text-center">Course ID</th>
                <th className="px-6 py-3 text-center">
                  Bkash/Nogod/Roket Number
                </th>
                <th className="px-6 py-3 text-center">Trx ID</th>
                <th className="px-6 py-3 text-center">Permission</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.map((info: any) => (
                <tr
                  key={info.id}
                  className="text-white border-b border-[#2c285f] bg-[#131129]"
                >
                  <td className="py-4 px-6 text-center">{info.userId}</td>
                  <td className="py-4 px-6 text-center">{info.course_id}</td>
                  <td className="py-4 px-6 text-center">{info.bkash_number}</td>
                  <td className="py-4 px-6 text-center">{info.trxId}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleApprove(info.id)}
                      className={`gradient-button text-white py-2 px-5 font-semibold text-lg ${
                        info.approve !== "false" ? "opacity-20" : "opacity-100"
                      }`}
                      disabled={info.approve === "true"} // Disable the button if already approved
                    >
                      {info.approve === "false" ? "Approve" : "Approved"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
