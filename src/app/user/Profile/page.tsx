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
    profileImageUrl: string;
  }) => {
    console.log('ChangedProfileImageUrl is: ', user.profileImageUrl);
    const token = Cookies.get("token"); // Get token from cookies
    if (user.profileImageUrl === "") {
      user.profileImageUrl = userData?.profileImageUrl;
    }
    try {
      const response = await axios.put(
        `${process.env.SEBEZ_ENDPOINT}/api/user/update/${user._id}`,
        {
          name: user.name,
          email: user.email,
          address: user.address,
          password: user.password,
          profileImageUrl: user.profileImageUrl
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
  console.log("user data loaded: ", userData);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      {userData ? (
        <div className="font-[sans-serif] max-w-[410px] p-6 rounded-lg mx-auto shadow-[0_6px_18px_-6px_rgba(193,195,248)] bg-white opacity-80 h-[400px] relative mt-20">
          <img src={userData.profileImageUrl} className="w-40 h-40 rounded-full absolute right-0 left-0 mx-auto -top-20" />
          <div className="mt-6 text-center">
            <div className="mt-20">
              <h4 className="text-sm font-extrabold text-gray-800">Name | {userData.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">Role | {userData.role}</p>
            </div>
            <div className="flex flex-col justify-center sm:p-8">
              <div className="mb-4 flex justify-between gap-10">
                <h3 className="text-xl font-serif">Email</h3>
                <p className="text-gray-700">{userData.email}</p>
              </div>
              <div className="mb-4 flex justify-between gap-10">
                <h3 className="text-xl font-serif">Address</h3>
                <p className="text-gray-700">{userData.address}</p>
              </div><div className="mb-4 flex justify-between gap-10">
                <h3 className="text-xl font-serif">Role</h3>
                <p className="text-gray-700">{userData.role}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleOpenModalEditProfile}>Edit</Button>
            </div>
          </div>
        </div>

      ) : (
        <div className="bg-white opacity-70 h-[400px] flex flex-col justify-between w-1/2 text-center rounded-lg">
          <p className="w-auto p-10">Profile Page</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 animate-spin fill-blue-600 block mx-auto"
            viewBox="0 0 24 24">
            <path
              d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
              data-original="#000000" />
          </svg>
          <p className="w-auto p-10 animate-bounce">Loading...</p>
        </div>

      )}

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
