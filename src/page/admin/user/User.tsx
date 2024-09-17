/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import useUser from "../../../hook/useUser";
import { FaSearch } from "react-icons/fa";
import Loader from "../../../components/utils/Lodder";
import { Link } from "react-router-dom";
import api from "../../../redux/api/api";
import Swal from "sweetalert2";

// Reusable Dropdown Component
const PermissionDropdown: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onMakeAdmin: () => void;
  onMakeTeacher: () => void;
}> = ({ isOpen, onClose, onMakeAdmin, onMakeTeacher }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <div
      ref={dropdownRef}
      className="absolute z-10 mt-2 w-[150px] bg-white rounded-md shadow-lg transition-opacity duration-200 ease-in-out"
    >
      <button
        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
        onClick={onMakeAdmin}
      >
        Make Admin
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
        onClick={onMakeTeacher}
      >
        Make Teacher
      </button>
    </div>
  ) : null;
};

// The main Users component
const Users: React.FC = () => {
  const { data, isLoading, refetch } = useUser();
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // For dropdown

  // Filtering the user list based on search term and selected role
  const filteredUsers = data?.data.filter((user: any) => {
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const deleteUser = async (id: string) => {
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
  };

  const makeAdmin = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await api.put(`/api/v1/users/${id}/make-admin`);

        if (data.success) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: "User is now an Admin",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update user role",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: (error as any).response.data.message,
          icon: "error",
        });
      }
    }
  };

  const makeTeacher = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user a Teacher?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Teacher!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await api.put(`/api/v1/users/${id}/make-teacher`);

        if (data.success) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: "User is now a Teacher",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update user role",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: (error as any).response.data.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="mt-5 px-4 md:px-8 min-h-screen">
      {/* Header Section */}
      <div className="bg-[#272758] py-10 px-5 rounded-lg text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Manage Users</h1>
        <p className="text-gray-300 mt-2">
          Search and manage roles for all registered users.
        </p>
        <Link
          to="/dashboard/add-user"
          className="gradient-button rounded-xl font-semibold text-white mt-4 py-2 px-6 inline-block"
        >
          Add New User
        </Link>
      </div>
      {/* Search and Filter */}
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

        {/* Filter */}
        <div className="flex gap-3 items-center">
          <p className="montserrat font-bold gradient-text text-[18px]">
            Filter by Role
          </p>
          <select
            className="bg-[#272758] text-white rounded-lg py-2 px-4 outline-none"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
      </div>

      <div className="bg h-[2px] w-full mt-4"></div>

      {/* User List */}
      <div className="overflow-x-auto min-h-screen w-full mt-4">
        <div className="text-lg border-b border-[#2c285f] bg-[#131129] text-white font-semibold uppercase grid grid-cols-1 md:grid-cols-5">
          <div className="px-6 py-3 text-center md:text-left">Name</div>
          <div className="px-6 py-3 text-center md:text-left">Email</div>
          <div className="px-6 py-3 text-center md:text-left md:pl-20">
            Mobile
          </div>
          <div className="px-6 col-span-1 md:col-span-2 py-3 text-center md:text-left">
            Action
          </div>
        </div>

        {/* Loader */}
        {isLoading && <Loader />}

        {/* User Data */}
        {filteredUsers?.map((user: any) => (
          <div
            className="text-lg border-b border-[#2c285f] bg-[#131129] text-white font-semibold grid grid-cols-1 md:grid-cols-5"
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
            <div className="px-6 col-span-1 md:col-span-2 py-3 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-2 md:gap-5">
                {/* Permission Button with Dropdown */}

                {user?.role !== "admin" && user?.role !== "teacher" ? (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setSelectedUser((prev) =>
                          prev === user.id ? null : user.id
                        )
                      }
                      className="gradient-button text-white py-2 px-3 md:px-5 font-semibold text-lg"
                    >
                      Permission
                    </button>
                    {selectedUser === user.id && (
                      <PermissionDropdown
                        isOpen={selectedUser === user.id}
                        onClose={() => setSelectedUser(null)}
                        onMakeAdmin={() => makeAdmin(user.id)}
                        onMakeTeacher={() => makeTeacher(user.id)}
                      />
                    )}
                  </div>
                ) : (
                  <button className="gradient-button text-white py-2 px-3 md:px-5 font-semibold text-lg">
                    {user?.role === "admin" && "Admin"}
                    {user?.role === "teacher" && "Teacher"}
                  </button>
                )}

                <Link
                  to={`/dashboard/update-user/${user.id}`}
                  className="gradient-button text-white py-2 px-3 md:px-5 font-semibold text-lg"
                >
                  Update
                </Link>
                <button
                  className="gradient-button text-white py-2 px-3 md:px-5 font-semibold text-lg"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
