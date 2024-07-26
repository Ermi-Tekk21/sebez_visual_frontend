"use client";

import React, { useEffect, useState } from "react";
import { Expand, LogOut, Minimize } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productTag from "../../../public/assets/icons/products.svg";
import profileTag from "../../../public/assets/icons/profile.svg";
import useAuthStore from "@/stores/AuthStore";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, []);
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`h-screen z-10 bg-gray-800 ${
        isExpanded ? "w-60" : "w-16"
      } transition-all duration-300 static items-center`}
    >
      <div className="flex justify-end">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white focus:outline-none"
        >
          {isExpanded ? <Minimize /> : <Expand />}
        </button>
      </div>
      <div className="flex flex-col items-center mt-4 space-y-4">
        <Link href="/artist/products" legacyBehavior>
          <a className="text-white">
            {isExpanded ? (
              <div className="bordered rounded-md px-3 shadow-md border-[1px]">
                add Products
              </div>
            ) : (
              <div className="bg-white rounded-full p-1 hover:p-2">
                <Image src={productTag} alt="" className="text-white z-0" />
              </div>
            )}
          </a>
        </Link>

        <Link href="/artist/Profile" legacyBehavior>
          <button className="text-white">
            {isExpanded ? (
              <div className="bordered shadow-md rounded-md px-3 border-[1px]">
                Profile
              </div>
            ) : (
              <div className="bg-white rounded-full p-1 hover:p-2">
                <Image src={profileTag} alt="" className="text-white z-0" />
              </div>
            )}
          </button>
        </Link>
        <div className="text-white">
          {isExpanded ? (
            <button
              onClick={logout}
              className="bordered shadow-md rounded-md px-3 border-[1px]"
            >
              Log out
            </button>
          ) : (
            <button onClick={logout}>
              <LogOut />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
