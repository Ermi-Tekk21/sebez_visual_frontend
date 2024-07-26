"use client";
// pages/auth/signin.tsx

import { useState } from "react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import Cookies from 'js-cookie';
import axios from "axios";
import { useRouter } from "next/navigation";
import useAuthStore from "../../stores/AuthStore";
import Link from "next/link";
const dotenv = require("dotenv");
dotenv.config();

const SignIn = () => {
  const [nameOrEmail, setNameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<{ token: string }>(
        `${process.env.SEBEZ_ENDPOINT}/api/auth`,
        { nameOrEmail, password }
      );
      
      // Store the token in cookies
      Cookies.set("token", response.data.token, { expires: 7 });
      login(response.data.token); // Update authentication state upon successful login

      const userResponse = await axios.get<{ role: string }>(
        `${process.env.SEBEZ_ENDPOINT}/api/user/getMe`,
        {
          headers: {
            "x-auth-token": response.data.token,
          },
        }
      );
      const user = userResponse.data;
      if (user.role) {
        router.push(`/${user.role}`);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Invalid email or password",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 z-10 opacity-85 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label
              htmlFor="nameOrEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Username:
            </label>
            <input
              type="text"
              id="nameOrEmail"
              value={nameOrEmail}
              onChange={(e) => setNameOrEmail(e.target.value)}
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
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
          <div className="flex justify-end text-blue-700 hover:text-blue-900">
            <Link href="/auth/signup">
              <p className="underline">create account</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
