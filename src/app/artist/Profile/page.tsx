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
import Cookies from "js-cookie"; // Import js-cookie for handling cookies
const dotenv = require("dotenv");
dotenv.config();

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isModalOpenToEdit, setModalOpenToEdit] = useState(false);

  const handleEditProfile = async (user: {
    _id: string;
    name: string;
    email: string;
    address: string;
    role: string;
    password: string;
  }) => {
    const token = Cookies.get("token"); // Get token from cookies
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
        description: "Profile updated successfully",
      });
    } catch (err: any) {
      console.log(err.response?.data);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${err.response?.data}`,
      });
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token"); // Get token from cookies
      try {
        const response = await axios.get(
          `${process.env.SEBEZ_ENDPOINT}/api/user/getMe`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setUserData(response.data);
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
