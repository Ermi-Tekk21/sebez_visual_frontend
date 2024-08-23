"use client"

import React, { useEffect } from "react";
import ContactUsPage from "@/components/landingPage/contact-us";
import AOS from "aos";

const ContactUs: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
        });
        AOS.refresh();
    }, [])
    return (
        <main data-aos="fade-up-left" className="mt-14">
            <ContactUsPage />
        </main>
    )
}

export default ContactUs;