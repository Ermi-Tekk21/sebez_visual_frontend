"use client";
import React from "react";
import LandingPage from "@/components/landingPage/landing-page";
import ProductPage from "@/components/landingPage/product-page";
import ContactUsPage from "@/components/landingPage/contact-us";
import AboutUsPage from "@/components/landingPage/about-us";
import { Suspense } from 'react';

const Home: React.FC = () => {
  return (
    <main className="bg-custom-green-3">
      <>
        <LandingPage />
        <AboutUsPage />
        <Suspense fallback={<div>Loading...</div>}>
          <ProductPage />
        </Suspense>
        <hr />
        <ContactUsPage />
      </>

    </main>
  );
};

export default Home;
