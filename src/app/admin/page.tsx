"use client";

import React, { useEffect, useState } from "react";
import useAuthStore from "../../stores/AuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArtImage from "../../../public/assets/images/art-4.jpg";
import BackgroundImage from "../../../public/assets/images/hero.jpg";
import axios from "axios";
import Message from "@/components/global/message";
const dotenv = require("dotenv");
import { ScrollArea } from "@/components/ui/scroll-area"
import Chart from "@/components/global/chart"

dotenv.config();

const AdminPage: React.FC = () => {
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
    if (userData.role && userData.role !== "admin") {
      router.push(`/${userData.role}`);
    }
    if (!isAuthenticated) {
      logout();
    }
  }, [userData, isAuthenticated, router, logout]);

  return (
    <main id="home" >
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-70"
        />
      </div>

      <div className="relative h-screen flex flex-col gap-6"><div
        className="flex items-center justify-center"
      >
        <div className="flex-col bg-custom-green-c opacity-80 rounded-br-2xl">
          <h1 className="m-auto mb-4 text-4xl font-semibold shadow-md rounded-tl-2xl px-40 p-4 items-center gap-20 bg-opacity-80">
            Welcome to{" "}
            <span className="text-custom-green-d"> Sebez Visual Art's</span>{" Admin "}
            Dashboard.
          </h1>
          <div className="text-center">
<h2 className="text-2xl font-semibold text-black mb-4">
              Connect with Creativity
            </h2>
            <p className="text-black mb-4 font-light">
              Navigate through different sections of the admin operations using
              the sidebar links.
            </p>
          </div>
          
        </div>


      </div> <ScrollArea className="h-screen w-full rounded-md border">
          <div className="flex">
            <div className="relative sm:w-[500px] m-auto bg-white shadow-md rounded-tl-2xl rounded-br-2xl p-8 bg-opacity-80">

              <h1 className="rounded-md border border-black p-3 text-2xl font-bold text-black mb-4">
                <span className="text-custom-green-d">Message</span>{" "}
                from users.
              </h1>
              <Message />
            </div>
            <div className="relative sm:w-[500px] m-auto bg-white shadow-md rounded-tl-2xl rounded-br-2xl p-4 bg-opacity-80">
              <div className="flex justify-between">
                <h1 className="rounded-md border border-black p-3 text-2xl font-bold text-black mb-4">
                  <span className="text-custom-green-d">Visualising</span>
                  Data
                </h1>
                <p className="align-middle items-center font-semibold border text-sm text-center border-black rounded-lg py-4 px-2 mb-4 ">Our <span className="text-custom-green-d font-extrabold">Monthly</span> Subscribers: <span className="rounded-full px-3 bg-black text-white text-xs font-bold py-2">{`${1525}`}</span></p>
              </div>
              <div>
                <Chart />
              </div>

            </div>

          </div> </ScrollArea>
      </div>




    </main>


  );
};

export default AdminPage;
