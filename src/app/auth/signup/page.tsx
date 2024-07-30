"use client";
// pages/auth/signup.tsx

import { useState } from "react";
import Image from "next/image";
import BackgroundImage from "../../../../public/assets/images/hero.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Show from "../../../../public/assets/icons/show.svg";
import Hide from "../../../../public/assets/icons/hide.svg";

const dotenv = require("dotenv");
dotenv.config();

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.SEBEZ_ENDPOINT}/api/user/create`, {
        name,
        email,
        address,
        password,
      });
      toast({
        variant: "default",
        description: "Successfully registered.",
      });
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (error: any) {
      console.error("Sign up error:", error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.response.data}`,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-40"
        />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 z-10 opacity-85 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-10">
            <div>
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="form-group">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>

                <div className="relative mt-1 w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-indigo-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <Image
                        src={Hide}
                        alt="User Tag"
                        className="text-white z-0"
                        style={{ width: "17px", height: "17px" }}
                      />
                    ) : (
                      <Image
                        src={Show}
                        alt="User Tag"
                        className="text-white z-0"
                        style={{ width: "17px", height: "17px" }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </Button>
          <div className="flex justify-end text-blue-700 hover:text-blue-900">
            <Link href="/auth/signin">
              <p className="underline">i already have account.</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
