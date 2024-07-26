"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BackgroundImage from "../../../../public/assets/images/hero.jpg";
import useAuthStore from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
const dotenv = require("dotenv");
dotenv.config();

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const GetUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get<User[]>(
          `${process.env.SEBEZ_ENDPOINT}/api/user/getalluser`,
          {
            headers: {
              "x-auth-token": token || "",
            },
          }
        );
        setUsers(response.data);
      } catch (error: any) {
        setError(
          error.response ? error.response.data.message : "Something went wrong"
        );
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${process.env.SEBEZ_ENDPOINT}/api/user/delete/${userId}`,
        {
          headers: {
            "x-auth-token": token || "",
          },
        }
      );
      // Update local state after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setMessage("User deleted successfully");
    } catch (error: any) {
      console.error("Error deleting user:", error);
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put<User>(
        `${process.env.SEBEZ_ENDPOINT}/api/user/update/${userId}`,
        { role: newRole },
        {
          headers: {
            "x-auth-token": token || "",
          },
        }
      );

      // Update local state after successful role update
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: response.data.role } : user
        )
      );
      setMessage("Role updated successfully");
    } catch (error: any) {
      console.error("Error updating user role:", error);
      setError(
        error.response ? error.response.data.message : "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-40 z-0"
        />
      </div>
      <div className="bg-white z-10 p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Users</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-gray-50">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      handleRoleChange(
                        user._id,
                        user.role === "admin" ? "user" : "admin"
                      )
                    }
                    className={`${
                      user.role === "admin" ? "bg-yellow-500" : "bg-green-500"
                    } text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 transition duration-200`}
                  >
                    {user.role === "admin" ? "Demote" : "Promote"}
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetUsers;
