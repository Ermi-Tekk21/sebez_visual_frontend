"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import message from "../../../public/assets/icons/message.svg";
import Image from "next/image";
import ResMesCard from "./resMesCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// Define the types for your user data
interface Message {
  _id: string;
  sender: { name: string; email: string };
  reciver: { name: string; email: string };
  message: string;
  timestamp: string;
  replayMessageId: {
    _id: string;
    message: string;
    timestamp: string;
  };
}
const ResMessage: React.FC = () => {
  const [userData, setUserData] = useState<Message[]>([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.SEBEZ_ENDPOINT}/api/message/getResMessageMe`,
          {
            headers: {
              "x-auth-token": token,
            }
          }
        );
        setUserData(response.data);
      } catch (error: any) {
        console.error("Error fetching user data:", error.response?.data || error.message);
      }
    };

    fetchUserData();
  }, []);
  return (
    <main className="z-40">
      <Sheet>
        <SheetTrigger>
          <Image
            src={message}
            alt="Sebez Logo"
            width={30}
            height={30}
            className="bg-white p-1 rounded-full"
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your message history...</SheetTitle>
            <SheetDescription className="flex flex-col gap-4">
              {userData.length > 0 ? (
                userData.map((message) => (
                  <ResMesCard key={message._id} message={message} />
                ))
              ) : (
                <p>No messages found.</p>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  );
};
export default ResMessage;
