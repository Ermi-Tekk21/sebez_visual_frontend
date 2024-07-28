import React from "react";
import Image from "next/image";
import SebezLogo from "../../../public/assets/images/sebezLogo.png";

const Footer: React.FC = () => {
  return (
    <div>
      <footer className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 py-14 px-16 font-sans tracking-wide relative">
      <div className="flex sm:hidden items-center lg:justify-center justify-center mb-10 ">
            <a href="#">
              <Image
                src={SebezLogo}
                alt="Sebez Logo"
                className="w-60"
                width={240}
                height={60}
              />
            </a>
          </div>
        <div className="flex justify-between flex-1 gap-8">
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white text-sm transition-all"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#about-us"
                  className="text-gray-300 hover:text-white text-sm transition-all"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/#product"
                  className="text-gray-300 hover:text-white text-sm transition-all"
                >
                  Products
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
            <ul className="space-y-4">
              <li>
              <a
  href="https://github.com/ermi-tekk21"
  className="text-gray-300 hover:text-white text-sm transition-all"
  target="_blank"
  rel="noopener noreferrer"
>
  Github
</a>

              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ermias-tekilemarkos-201650262/"
  className="text-gray-300 hover:text-white text-sm transition-all"
  target="_blank"
  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white text-sm transition-all"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white text-sm transition-all"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white text-sm transition-all"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white text-sm transition-all"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          <div className="flex max-sm:hidden items-center lg:justify-center">
            <a href="#">
              <Image
                src={SebezLogo}
                alt="Sebez Logo"
                className="w-60"
                width={240}
                height={60}
              />
            </a>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        <div className="flex sm:justify-between flex-wrap gap-6">
          <p className="text-gray-300 text-sm">
            © 2023
            <a
              href="https://readymadeui.com/"
              target="_blank"
              className="hover:underline mx-1"
              rel="noopener noreferrer"
            >
              Sebez
            </a>
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
