import React from "react";
import Image from "next/image";
import ArtImage from "../../../public/assets/images/art-4.jpg";
import BackgroundImage from "../../../public/assets/images/hero.jpg";
import Link from "next/link";
import useAuthStore from "@/stores/AuthStore";

const LandingPage: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <main
      id="home"
      className=" relative h-screen flex items-center justify-center"
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
            Welcome to{" "}
            <span className="text-custom-green-d">Sebez Visual Arts.</span>
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
          <Link href={isAuthenticated ? "/user" : "/auth/signin"}>
            <button className="bg-custom-green-b font-semibold text-white px-6 py-2 rounded-full flex items-center gap-2">
              Shop now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
