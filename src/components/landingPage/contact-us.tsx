import React from "react";

const ContactUsPage: React.FC = () => {
  return (
    <main id="contact-us">
      {/* Contact Us Section Header */}
      <section className="bg-gray-300 py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-950">Contact Us</h1>
          <p className="text-lg text-black mt-2">
            Reach out to us for any inquiries or collaborations
          </p>
        </div>
      </section>

      {/* Main Contact Section: Half Map, Half Form */}
      <section className="py-20 flex flex-wrap">
        {/* Left Half: Map */}
        <div className="w-full md:w-1/2">
          <div className="relative h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15762.233448053032!2d38.7375738!3d9.0127212!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8553784626a5%3A0x94c194d17a43f4d7!2sALX%20Ethiopia%20%7CLideta%20Hub%2C%204th%20Floor%7C!5e0!3m2!1sen!2set!4v1720104341439!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Right Half: Contact Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-custom-green-b text-white px-4 py-2 rounded-md hover:bg-custom-green-c focus:outline-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
