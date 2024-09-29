/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import useInvoice from "../../../hook/useInvoice";
import Swal from "sweetalert2";
import api from "../../../redux/api/api";

const Invoice: React.FC = () => {
  const { data: invoice, refetch } = useInvoice();
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

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
        const res = await api.put(`/api/v1/enrollments/${id}/approve`);
        if (res.data.success) {
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
      } catch (_error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to approve",
          icon: "error",
        });
      }
    }
  };

  // Filter function based on approval status
  const filteredInvoice = invoice?.filter((info: any) => {
    if (filter === "approved") return info.approve === "true";
    if (filter === "pending") return info.approve === "false";
    return true;
  });

  return (
    <div className="min-h-screen  px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white gradient-text">
            Invoice Management
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-400">
            Review and approve pending enrollments for various courses.
          </p>
        </div>

        {/* Filter Options */}
        <div className="flex lg:justify-end justify-center gap-2  mb-8  flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`py-2 px-4 font-semibold rounded-lg transition-colors ${
              filter === "all"
                ? "bg text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`py-2 px-4 font-semibold rounded-lg transition-colors ${
              filter === "pending"
                ? "bg text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Pending Approval
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`py-2 px-4 font-semibold rounded-lg transition-colors ${
              filter === "approved"
                ? "bg text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Approved
          </button>
        </div>
        <div className="bg h-[2px] w-full mt-4"></div>
        {/* Table Section */}
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full border-separate border-spacing-0">
            <thead className="text-[16px] md:text-[18px] border-b border-[#2c285f] bg-[#131129] gradient-text font-semibold uppercase">
              <tr>
                <th className="px-2 md:px-6 py-3 text-center">User ID</th>
                <th className="px-2 md:px-6 py-3 text-center">Course ID</th>
                <th className="px-2 md:px-6 py-3 text-center">
                  Bkash/Nogod/Roket Number
                </th>
                <th className="px-2 md:px-6 py-3 text-center">Trx ID</th>
                <th className="px-2 md:px-6 py-3 text-center">Permission</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoice?.map((info: any) => (
                <tr
                  key={info.id}
                  className="text-white border-b border-[#2c285f] bg-[#131129]"
                >
                  <td className="py-4 px-2 md:px-6 text-center text-[14px] md:text-[16px]">
                    {info.userId}
                  </td>
                  <td className="py-4 px-2 md:px-6 text-center text-[14px] md:text-[16px]">
                    {info.course_id}
                  </td>
                  <td className="py-4 px-2 md:px-6 text-center text-[14px] md:text-[16px]">
                    {info.bkash_number}
                  </td>
                  <td className="py-4 px-2 md:px-6 text-center text-[14px] md:text-[16px] whitespace-nowrap">
                    {info.trxId}
                  </td>
                  <td className="py-4 px-2 md:px-6 text-center text-[14px] md:text-[16px]">
                    <button
                      onClick={() => handleApprove(info.id)}
                      className={`gradient-button text-white py-2 px-4 font-semibold text-base md:text-lg ${
                        info.approve !== "false" ? "opacity-20" : "opacity-100"
                      }`}
                      disabled={info.approve === "true"}
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
