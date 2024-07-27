"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/AuthStore";
import ProductPage from "@/components/landingPage/product-page";
import axios from "axios";
import Cookies from "js-cookie";
import LandingPage from "@/components/landingPage/landing-page";
import AboutUsPage from "@/components/landingPage/about-us";
import ContactUsPage from "@/components/landingPage/contact-us";
const dotenv = require("dotenv");
dotenv.config();

const UserPage = () => {
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
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
    if (userData.role) {
      router.push(`/${userData.role}`);
    }
    if (!isAuthenticated) {
      logout();
    }
  }, [userData, isAuthenticated, router, logout]);

  return (
    <div>
      <LandingPage />
      <ProductPage />
      <hr />
      <AboutUsPage />
      <ContactUsPage />
    </div>
  );
};

export default UserPage;
