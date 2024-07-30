"use client";

import React, { useEffect } from "react";
import AboutUsPage from "@/components/landingPage/about-us";
import AOS from "aos";

const Page: React.FC = () => {
    useEffect(() => {
        AOS.init({
          duration: 600, // Example of AOS options
          once: true, // Whether animation should happen only once - while scrolling down
        });
        AOS.refresh(); // Refresh AOS to detect new elements
      }, []);
  return (
    <main>
      <div data-aos="fade-up-left" className="mt-14">
        <AboutUsPage />
      </div>
    </main>
  );
};

export default Page;
