import React from "react";
import Image from "next/image";
import AboutImage from "../../../public/assets/images/art7.jpg"; // Replace with your image path

const AboutUsPage: React.FC = () => {
  return (
    <main id="about-us">
      {/* About Us Section Header */}
      <section className="bg-gray-900 py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">About Us</h1>
          <p className="text-lg text-gray-300 mt-2">
            Learn more about our company and our mission
          </p>
        </div>
      </section>

      {/* Main About Us Section: Half Image, Half Text */}
      <section className="py-20 flex flex-wrap">
        {/* Left Half: Image */}
        <div className="w-full md:w-1/2">
          <div
            className="relative  p-4 
          "
          >
            <Image
              src={AboutImage}
              alt="About Us Image"
              layout=""
               style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Right Half: Text */}
        <div className="w-full md:w-1/2 p-8 flex items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 max-sm:text-center">Who We Are</h2>
            <p className="text-lg max-sm:text-center text-gray-700">
              Welcome to Sebez Visual Art, your premier destination for
              discovering and acquiring unique visual artworks. At Sebez, we
              celebrate creativity, culture, and the artistic spirit by offering
              a diverse collection of drawings, sketches, and paintings from
              talented artists.
            </p>

            <p className="text-lg max-sm:text-center text-gray-700 mt-4">
              <span className="text-custom-green-d max-sm:text-center font-semibold">
                Our Mission{" "}
              </span>
              is to bridge the gap between artists and art enthusiasts. We aim
              to provide a seamless and enriching experience for those looking
              to buy, sell, and appreciate art. By creating an accessible
              platform, we empower artists to showcase their work and reach a
              broader audience, while art lovers can find and purchase pieces
              that resonate with them.
            </p>
            <p className="text-lg max-sm:text-center text-gray-700 mt-4">
              <span className="text-custom-green-d font-semibold">
                Join Our Community{" "}
              </span>
              Whether you are an artist looking to showcase your work or an art
              lover searching for that perfect piece, Sebez Visual Art is here
              to help you on your artistic journey. Join our community today and
              experience the joy of discovering and owning beautiful art.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
