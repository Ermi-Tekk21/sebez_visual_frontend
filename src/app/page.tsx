"use client";
import React from "react";
import LandingPage from "@/components/landingPage/landing-page";
import ProductPage from "@/components/landingPage/product-page";
import ContactUsPage from "@/components/landingPage/contact-us";
import AboutUsPage from "@/components/landingPage/about-us";

const Home: React.FC = () => {
  return (
    <main className="bg-custom-green-3">
      <>
        <LandingPage />
        <AboutUsPage />
        <ProductPage />
        <ContactUsPage />
      </>

    </main>
  );
};

export default Home;
