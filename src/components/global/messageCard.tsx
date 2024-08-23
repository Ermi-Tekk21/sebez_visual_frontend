import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from '../ui/use-toast';
import Image from 'next/image';
import { Button } from '../ui/button';
import { jwtDecode } from "jwt-decode"; // Make sure this is correctly imported

interface MessageCardProps {
  id: string;
  name: string;
  senderId: string;
  email: string;
  message: string;
  timeCreated: string;
}

interface AuthUser {
  userId: string;
  name: string;
  email: string;
  role: string;
}


const MessageCard: React.FC<MessageCardProps> = ({ id, name, email, message, timeCreated, senderId }) => {
  const [ResMessageOpen, setResMessageOpen] = useState<boolean>(false);
  const [ResMessage, setResMessage] = useState<string>("");
  const [reciver, setReciver] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [replayId, setReplayId] = useState<string>("");
  const accessToken = Cookies.get('token');

  const authUser: AuthUser | null = accessToken ? jwtDecode<AuthUser>(accessToken) : null;
  useEffect(() => {
    if (authUser) {
      setSender(authUser.userId);
      setReciver(senderId);
      setReplayId(id)
    }
    // console.log('sender id :', sender);
    // console.log('reciver id :', reciver);

  }, [authUser]);


  const handleDelete = async () => {
    const token = Cookies.get('token');

    try {
      await axios.delete(
        `${process.env.SEBEZ_ENDPOINT}/api/message/deleteReqMessage/${id}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      toast({
        variant: 'default',
        description: 'Message deleted successfully',
      });
      window.location.reload();
    } catch (error: any) {
      console.error('Error deleting message:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const handleResponse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      
      await axios.post(
        `${process.env.SEBEZ_ENDPOINT}/api/message/createResMessage`,
        { sender: sender, reciver: reciver, replayMessageId: replayId, message: ResMessage },
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
      setResMessageOpen(false);
    } catch (error: any) {
      console.error("Message creation error:", error);

      const errorMessage = error.response?.data || "An unexpected error occurred. Please try again later.";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong....",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-2 rounded-md border border-black p-2 shadow-2xl">
      <div className="flex justify-between">
        <p className="rounded-md border border-black p-2"><strong>Sender:</strong> {name}</p>
        <p className="rounded-md border border-black p-2"><strong>Email:</strong> {email}</p>
      </div>

      <div className="flex justify-between">
        <div className="rounded-md border w-full border-black p-2"><strong>Message:</strong> {message}</div>
      </div>


      {
        ResMessageOpen && (
          <form onSubmit={handleResponse} className="rounded-md border border-black p-2 w-full">
            <div className='flex justify-between my-2'>
              <p className='font-semibold m-2'>Replay Message</p>
              <div className='flex gap-6 justify-end'>
                <Button
                  onClick={() => {
                    setResMessageOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                >
                  Send
                </Button></div>
            </div>
            <textarea
              id="message"
              name="message"
              value={ResMessage}
              onChange={(e) => setResMessage(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400"
              placeholder="Your Message"
              required
            ></textarea>
          </form>
        )
      }

      <div className="flex justify-between items-center">
        <p className="rounded-md text-sm border border-black p-2"><strong>Sent At:</strong> {timeCreated}</p>
        {
          !ResMessageOpen && (
            <Button
              onClick={() => {
                setResMessageOpen(true);
              }}
            >
              Replay
            </Button>
          )
        }

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-200 mr-2"
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default MessageCard;
