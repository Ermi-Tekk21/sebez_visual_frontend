import axios from "axios";
import React, { FormEvent, useState, useEffect } from "react";
import { toast } from "../ui/use-toast";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Make sure this is correctly imported
import { Button } from "../ui/button";

interface AuthUser {
  userId: string;
  name: string;
  email: string;
  role: string;
}

const ContactUsPage: React.FC = () => {
  const [reqSenderName, setReqSenderName] = useState<string>("");
  const [reqSenderEmail, setReqSenderEmail] = useState<string>("");
  const [ReqMessage, setReqMessage] = useState<string>("");

  const accessToken = Cookies.get('token'); // Get the token from cookies
  const authUser: AuthUser | null = accessToken ? jwtDecode<AuthUser>(accessToken) : null;
  useEffect(() => {
    if (authUser) {
      setReqSenderEmail(authUser.email);
      setReqSenderName(authUser.name);
    }
  }, [authUser]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authUser) {
      console.error("Invalid or missing authentication token.");
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Unable to authenticate user. Please log in.",
      });
      return;
    }

    try {
      await axios.post(
        `${process.env.SEBEZ_ENDPOINT}/api/message/createReqMessage`,
        { sender: authUser.userId, message: ReqMessage },
        {
          headers: {
            "x-auth-token": accessToken || "",
          },
        }
      );
      toast({
        variant: "default",
        description: "Successfully sent your message.",
      });
    } catch (error: any) {
      console.error("Message creation error:", error);

      const errorMessage = error.response?.data || "An unexpected error occurred. Please try again later.";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  };

  return (
    <main id="contact-us" className="t">
      <section className="bg-gray-900 py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
          <p className="text-lg text-gray-300 mt-2">
            Reach out to us for any inquiries or collaborations | ask us if you have products for <span className="bordered border-[1px] rounded-lg font-semibold shadow-2xl p-2">selling</span>
          </p>
        </div>
      </section>

      <section className="flex max-sm:flex-col gap-6 p-10">
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

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={reqSenderName}
                onChange={(e) => setReqSenderName(e.target.value)}
                name="name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={reqSenderEmail}
                onChange={(e) => setReqSenderEmail(e.target.value)}
                name="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="text-lg font-semibold flex justify-between">
                <p>Message</p> <span onClick={() => { setReqMessage("i want to sell my product. change my role to Artist") }} className="bg-slate-900 text-white mb-2 animate-pulse  border px-5 rounded-md py-1">sell request</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={ReqMessage}
                onChange={(e) => setReqMessage(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
                placeholder="Your Message"
                required
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
