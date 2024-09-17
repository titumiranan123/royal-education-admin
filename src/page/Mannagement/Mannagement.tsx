/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";

import { Link } from "react-router-dom";
import useUser from "../../hook/useUser";
import Loader from "../../components/utils/Lodder";
import api from "../../redux/api/api";
import Swal from "sweetalert2";

// The main Users component
const Mannagement: React.FC = () => {
  const { data, isLoading, refetch } = useUser();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering the user list to show only admins
  const adminUsers = data?.data.filter((user: any) => user.role === "admin");

  // Filtering admin users based on search term
  const filteredAdmins = adminUsers?.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-5 px-4 md:px-8 min-h-screen">
      {/* Header Section */}
      <div className="bg-[#272758] py-10 px-5 rounded-lg text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Admins</h1>
        <p className="text-gray-300 mt-2">Search and view admin users.</p>
        <Link
          to="/dashboard/add-user"
          className="gradient-button rounded-xl font-semibold text-white mt-4 py-2 px-6 inline-block"
        >
          Add New User
        </Link>
      </div>

      {/* Search */}
      <div className="flex flex-wrap gap-5 items-center justify-between">
        <div className="bg p-[2px] rounded-lg flex-grow max-w-lg">
          <div className="text-white bg-[#272758] rounded-lg px-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by name or email"
              className="px-4 py-2 outline-none focus:outline-none rounded-lg bg-[#272758] w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="text-xl" />
          </div>
        </div>
      </div>

      <div className="bg h-[2px] w-full mt-4"></div>

      {/* Admin List */}
      <div className="overflow-x-auto min-h-screen w-full mt-4">
        <div className="text-lg border-b border-[#2c285f] bg-[#131129] text-white font-semibold uppercase grid grid-cols-1 md:grid-cols-4">
          <div className="px-6 py-3 text-center md:text-left">Name</div>
          <div className="px-6 py-3 text-center md:text-left">Email</div>
          <div className="px-6 py-3 text-center md:text-left md:pl-20">
            Mobile
          </div>
          <div className="px-6 py-3 text-center md:text-left">Action</div>
        </div>

        {/* Loader */}
        {isLoading && <Loader />}

        {/* Admin Data */}
        {filteredAdmins?.map((user: any) => (
          <div
            className="text-lg border-b border-[#2c285f] bg-[#131129] text-white font-semibold grid grid-cols-1 md:grid-cols-4"
            key={user.id}
          >
            <div className="px-6 py-3 text-center md:text-left">
              {user.name}
            </div>
            <div className="px-6 py-3 text-center md:text-left">
              {user.email}
            </div>
            <div className="px-6 py-3 text-center md:text-left md:pl-20">
              {user.mobile}
            </div>

            {/* Actions */}
            <div className="px-6 py-3 text-center md:text-left">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Function to handle user deletion
  async function deleteUser(id: string) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await api.delete(`/api/v1/users/${id}`);

        if (data.success) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted successfully",
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
        console.error("Error deleting user:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user",
          icon: "error",
        });
      }
    }
  }
};



export default Mannagement;
