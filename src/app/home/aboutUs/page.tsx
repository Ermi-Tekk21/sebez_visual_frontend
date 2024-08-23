"use client"

import AboutUsPage from "@/components/landingPage/about-us";
import React, { useEffect } from "react";
import AOS from "aos"

const AboutUs: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            once: true,
        });
        AOS.refresh()
    }, [])
    return (
        <main data-aos="fade-up-left" className="mt-14">
            <AboutUsPage />
        </main>
    )
}

export default AboutUs;