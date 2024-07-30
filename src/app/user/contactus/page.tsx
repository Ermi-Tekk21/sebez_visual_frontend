"use client";

import React, { useEffect } from "react";
import ContactUsPage from "@/components/landingPage/contact-us";
import AOS from "aos";
import "aos/dist/aos.css"; // Ensure the AOS CSS is imported

const Page: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 500, // Example of AOS options
      once: true, // Whether animation should happen only once - while scrolling down
    });
    AOS.refresh(); // Refresh AOS to detect new elements
  }, []);

  return (
    <main>
      <div data-aos="fade-up-left" className="mt-14">
        <ContactUsPage />
      </div>
    </main>
  );
};

export default Page;
