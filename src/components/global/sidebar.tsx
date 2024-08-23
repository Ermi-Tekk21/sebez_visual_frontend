"use client";

import React, { useEffect, useState } from "react";
import { Expand, LogOut, Minimize } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import userTag from "../../../public/assets/icons/manage.svg";
import productTag from "../../../public/assets/icons/products.svg";
import profileTag from "../../../public/assets/icons/profile.svg";
import dashBoard from "../../../public/assets/icons/dashBoard.svg"
import prdList from "../../../public/assets/icons/listPrd.svg";
import useAuthStore from "@/stores/AuthStore";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "../ui/use-toast";
import Cookies from "js-cookie";
const dotenv = require("dotenv");
dotenv.config();

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [userData, setUserData] = useState<{ role?: string }>({});
  const logout = useAuthStore((state) => state.logout);
  const pathname = usePathname();
  const router = useRouter();
  const currentTime = Date.now() / 1000;




  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp < currentTime) {
        toast({
          variant: "default",
          description: "Token expired, please sign in again",
        });
        logout();
        router.push("/auth/signin");
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
        console.error(error);
      }
    };

    fetchUserData();
  }, [currentTime, logout, router]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isAdmin = userData.role === "admin";
  const isArtist = userData.role === "artist";
  const basePath = pathname.split("/")[1];


  return (
    <div
      className={`sm:h-screen bg-gray-800 z-50 ${isExpanded ? "sm:w-60" : "sm:w-16"
        } transition-all duration-300 sm:static max-sm:justify-around items-center sm:overflow-y-auto max-sm:flex max-sm:flex-row max-sm:gap-4 max-sm:w-full`}
    >
      <div className="flex justify-end sm:justify-center sm:mt-4">
        <button
          onClick={toggleSidebar}
          className="p-2 max-sm:hidden text-white focus:outline-none mb-16"
        >
          {isExpanded ? <Minimize /> : <Expand />}
        </button>
      </div>
      <div className="flex sm:flex-col items-center sm:space-y-4 max-sm:space-x-4 max-sm:space-y-0 max-sm:mt-0 max-sm:flex-grow">

        {isArtist && (
          <Link href={`/${basePath}/`} legacyBehavior>
            <a className="text-white">
              {isExpanded ? (
                <div
                  className={`bordered shadow-md rounded-md px-3 border-[1px] ${pathname == (`/${basePath}`) &&
                    "bg-white text-blue-950"
                    }`}
                >
                  Dashboard
                </div>
              ) : (
                <div
                  className={`bg-white rounded-full p-1 hover:p-2 ${pathname == (`/${basePath}`) &&
                    "bg-slate-500 p-3"
                    }`}
                >
                  <Image
                    src={dashBoard}
                    alt="User Tag"
                    className="text-white z-0"
                  />
                </div>
              )}
            </a>
          </Link>


        )}

        {isAdmin && (
          <Link href={`/${basePath}/`} legacyBehavior>
            <a className="text-white">
              {isExpanded ? (
                <div
                  className={`bordered shadow-md rounded-md px-3 border-[1px] ${pathname == (`/${basePath}`) &&
                    "bg-white text-blue-950"
                    }`}
                >
                  Dashboard
                </div>
              ) : (
                <div
                  className={`bg-white rounded-full p-1 hover:p-2 ${pathname == (`/${basePath}`) &&
                    "bg-slate-500 p-3"
                    }`}
                >
                  <Image
                    src={dashBoard}
                    alt="User Tag"
                    className="text-white z-0"
                  />
                </div>
              )}
            </a>
          </Link>
        )}

        {isAdmin && (
          <Link href={`/${basePath}/users`} legacyBehavior>
            <a className="text-white">
              {isExpanded ? (
                <div
                  className={`bordered shadow-md rounded-md px-3 border-[1px] ${pathname.includes(`${basePath}/users`) &&
                    "bg-white text-blue-950"
                    }`}
                >
                  Get Users
                </div>
              ) : (
                <div
                  className={`bg-white rounded-full p-1 hover:p-2 ${pathname.includes(`${basePath}/users`) &&
                    "bg-slate-500 p-3"
                    }`}
                >
                  <Image
                    src={userTag}
                    alt="User Tag"
                    className="text-white z-0"
                  />
                </div>
              )}
            </a>
          </Link>
        )}
        <Link href={`/${basePath}/products`} legacyBehavior>
          <a className="text-white">
            {isExpanded ? (
              <div
                className={`bordered shadow-md rounded-md px-3 border-[1px] ${pathname.includes(`${basePath}/products`) &&
                  "bg-white text-blue-950"
                  }`}
              >
                Add Products
              </div>
            ) : (
              <div
                className={`bg-white rounded-full p-1 hover:p-2 ${pathname.includes(`${basePath}/products`) &&
                  "bg-slate-500 p-3"
                  }`}
              >
                <Image
                  src={productTag}
                  alt="Product Tag"
                  className="text-white z-0"
                />
              </div>
            )}
          </a>
        </Link>
        {isAdmin && (
          <Link href={`/${basePath}/getProducts`} legacyBehavior>
            <a className="text-white">
              {isExpanded ? (
                <div
                  className={`bordered shadow-md rounded-md px-3 border-[1px] ${pathname.includes(`${basePath}/getProducts`) &&
                    "bg-white text-blue-950"
                    }`}
                >
                  Get Products
                </div>
              ) : (
                <div
                  className={`bg-white rounded-full p-1 hover:p-2 ${pathname.includes(`${basePath}/getProducts`) &&
                    "bg-slate-500 p-3"
                    }`}
                >
                  <Image
                    src={prdList}
                    alt="Product List"
                    className="text-white z-0"
                  />
                </div>
              )}
            </a>
          </Link>
        )}
        <Link href={`/${basePath}/Profile`} legacyBehavior>
          <a className="text-white">
            {isExpanded ? (
              <div
                className={`bordered shadow-md rounded-md px-3 border-[1px] ${pathname.includes(`${basePath}/Profile`) &&
                  "bg-white text-blue-950"
                  }`}
              >
                Profile
              </div>
            ) : (
              <div
                className={`bg-white rounded-full p-1 hover:p-2 ${pathname.includes(`${basePath}/Profile`) &&
                  "bg-slate-500 p-3"
                  }`}
              >
                <Image
                  src={profileTag}
                  alt="Profile Tag"
                  className="text-white z-0"
                />
              </div>
            )}
          </a>
        </Link>
        <button
          onClick={() => {
            Cookies.remove("token");
            logout();
            router.push("/auth/signin");
          }}
          className={`text-white hover:bg-red-600 hover:text-white bordered shadow-md rounded-md px-3 border-[1px] ${isExpanded ? "mt-4" : "p-3"
            }`}
        >
          {isExpanded ? "Log out" : <LogOut />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
