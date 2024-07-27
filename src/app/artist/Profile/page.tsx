"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BackgroundImage from "../../../../public/assets/images/hero.jpg";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/AuthStore";
import { Button } from "@/components/ui/button";
import EditProfile from "@/components/global/editProfile";
import { toast } from "@/components/ui/use-toast";
const dotenv = require("dotenv");
dotenv.config();

const Profile = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  interface User {
    _id: string;
    name: string;
    email: string;
    address: string;
    role: string;
    password: string;
  }
  
  const [userData, setUserData] = useState<User>({
    _id: "",
    name: "",
    email: "",
    address: "",
    role: "",
    password: "",
  });
  const [isModalOpenToEdit, setModalOpenToEdit] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  const handleEditProfile = async (user: {
    _id: string;
    name: string;
    email: string;
    address: string;
    role: string;
    password: string;
  }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${process.env.SEBEZ_ENDPOINT}/api/user/update/${user._id}`,
        {
          name: user.name,
          email: user.email,
          address: user.address,
          password: user.password,
        },
        {
          headers: {
            "x-auth-token": token || "",
          },
        }
      );
      setUserData(response.data);
      setModalOpenToEdit(false);
      toast({
        variant: "default",
        description: "profile updated successfully",
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "unable to update",
      });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
      router.push("/auth/signin");
    }
  }, [isAuthenticated, logout, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.SEBEZ_ENDPOINT}api/user/getMe`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setUserData(response.data);
        console.log("User data testing: ", userData);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleCloseModalEditProfile = () => {
    setModalOpenToEdit(false);
  };
  const handleOpenModalEditProfile = () => {
    setModalOpenToEdit(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40 z-0"
        />
      </div>
      <div className="bg-white p-8 z-10 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        {userData ? (
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Name:</h3>
              <p className="text-gray-700">{userData.name}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Email:</h3>
              <p className="text-gray-700">{userData.email}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Address:</h3>
              <p className="text-gray-700">{userData.address}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Role:</h3>
              <p className="text-gray-700">{userData.role}</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleOpenModalEditProfile}>Edit</Button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <EditProfile
        isOpen={isModalOpenToEdit}
        onClose={handleCloseModalEditProfile}
        userData={userData}
        handleEditProfile={handleEditProfile}
      />
    </div>
  );
};

export default Profile;
