"use client";

import React, { useEffect, useState } from "react";
import useAuthStore from "../../stores/AuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArtImage from "../../../public/assets/images/art-4.jpg";
import BackgroundImage from "../../../public/assets/images/hero.jpg";
import axios from "axios";
const dotenv = require("dotenv");
dotenv.config();

const ArtistPage: React.FC = () => {
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
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
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.role && userData.role !== "artist") {
      router.push(`/${userData.role}`);
    }
    if (!isAuthenticated) {
      logout();
    }
  }, [userData, isAuthenticated, router, logout]);
  return (
    <main
      id="home"
      className="relative h-screen flex items-center justify-center"
    >
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="Background"
         fill
           style={{ objectFit: "cover" }}
          className="opacity-70"
        />
      </div>
      <div className="relative w-3/4 m-auto bg-custom-green-c shadow-md rounded-tl-2xl  rounded-br-2xl p-8 flex items-center gap-20 bg-opacity-80">
        <div className="flex-shrink-0">
          <Image
            src={ArtImage}
            alt="Artwork"
            className="rounded-tl-2xl rounded-br-2xl"
            width={300}
            height={400}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-black mb-4">
            Welcome to
            <span className="text-custom-green-d ">
              {" "}
              Sebez Visual Arts
            </span>{" "}
            ARTIST's Dashboard.
          </h1>
          <h2 className="text-2xl font-semibold text-black mb-4">
            Connect with Creativity
          </h2>
          <p className="text-black mb-4 font-light">
            Navigate through different sections of the admin operations using
            the sidebar links.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ArtistPage;
