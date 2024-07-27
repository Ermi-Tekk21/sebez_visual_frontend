import React, { useEffect, useState } from "react";
import Image from "next/image";
import ArtImage from "../../../public/assets/images/art-4.jpg";
import AfricanArtImage from "../../../public/assets/images/africanArt.jpg";
import BackgroundImage from "../../../public/assets/images/hero.jpg";
import Link from "next/link";
import useAuthStore from "@/stores/AuthStore";
import Cookies from "js-cookie";
import axios from "axios";
const dotenv = require("dotenv");
dotenv.config();

const LandingPage: React.FC = () => {
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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    const token = Cookies.get("token");
    useEffect(() => {
      const fetchUserData = async () => {
        if (token) {
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
        }
      };
      fetchUserData();
    }, []);
  }

  return (
    <main
      id="home"
      className=" relative flex sm:h-screen items-center justify-center"
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
      <div className="flex max-sm:flex-1 max-sm:flex-col relative w-3/4 m-auto bg-custom-green-c shadow-md rounded-tl-2xl  rounded-br-2xl p-8 items-center gap-20 bg-opacity-80">
        <div className="flex-shrink-0">
          {isAuthenticated ? (
             <Image
             src={AfricanArtImage}
             alt="Artwork"
             className="rounded-tl-2xl rounded-br-2xl max-sm:mt-16"
             style={{width: '300px', height: '350px'}}
           />
          ):(
             <Image
            src={ArtImage}
            alt="Artwork"
            className="rounded-tl-2xl max-sm:mt-16 rounded-br-2xl"
            width={300}
            height={400}
          />
          )}
         
        </div>
        <div>
          {isAuthenticated && (
            <div>
              <h1 className="text-green-950 max-sm:text-4xl text-5xl font-extralight underline-offset-4">
              Hi ! {`${userData.name.toUpperCase()}`}
            </h1>
            <p>{" "}...</p>
            </div>
            
            
          )}

          <h1 className="text-4xl max-sm:text-3xl max-sm:font-semibold font-bold text-black mb-4">
            Welcome to
            <span className="text-custom-green-d"> Sebez Visual Arts.</span>
          </h1>
          <h2 className="text-2xl font-semibold text-black mb-4">
            Discover Unique Visual Creations
          </h2>
          <p className="text-black mb-4 font-light">
            Explore a world of creativity and inspiration at Sebez Visual Arts.
            From stunning paintings to intricate sketches, our platform
            showcases a diverse collection of visual artworks created by
            talented artists from around the globe.
          </p>
          <div className="flex gap-6 flex-1 max-sm:flex-col">
            <Link href={isAuthenticated ? "/user/#product" : "/auth/signin"}>
            <button className="focus:font-bold hover:ring ring-white ring-offset-2 shadow-lg bg-custom-green-b font-semibold text-white px-6 py-2 rounded-full flex items-center gap-2">
              Shop now
              {isAuthenticated ? (
                <div className="ratate-180 animate-bounce">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rotate-90"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 animate-bounce"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              )}
            </button>
          </Link>
          {isAuthenticated && (
            <div>
              <Link href="/user/#contact-us">
              <button className="hover:ring ring-white ring-offset-2 shadow-lg bg-custom-green-b font-semibold text-white px-6 py-2 rounded-full flex items-center gap-2">request to sell your product
              <div className="ratate-180 animate-bounce">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rotate-90"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
                </div>
              </button>
              </Link>
              
            </div>
          )}
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
