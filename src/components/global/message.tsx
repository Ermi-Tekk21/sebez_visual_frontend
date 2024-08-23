import React, { useState, useEffect } from 'react';
import MessageCard from './messageCard';
import Cookies from "js-cookie";
import axios from "axios";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

interface MessageType {
    _id: string;
    sender: {
        _id: string;
        name: string;
        email: string;
    } | null;
    receivers: {
        _id: string;
        name: string;
        email: string;
    }[];
    message: string;
    timestamp: string;
}

const Message: React.FC = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const accessToken = Cookies.get('token');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get<MessageType[]>(
                    `${process.env.SEBEZ_ENDPOINT}/api/message/getAllReqMessage`,
                    {
                        headers: {
                            "x-auth-token": accessToken || "",
                        },
                    }
                );
                setMessages(response.data);
            } catch (error: any) {
                console.error(
                    error.response?.data?.message || "Something went wrong"
                );
            }
        };

        fetchMessages();
    }, []);
console.log("messages: ", messages);

    return (
        <div>
            <div className='flex text-xs justify-between'>
                <p className="shadow-2xl font-semibold border text-center border-black rounded-lg p-2 mb-4">
                    Total messages: <span className="rounded-full px-2 bg-black text-white font-bold py-1">{`${messages.length}`}</span>
                </p>
                {/* <p className="shadow-2xl font-semibold border text-center border-black rounded-lg p-2 mb-4">
                    Seen messages: <span className="rounded-full px-2 bg-black text-white font-bold py-1">{`${messages.length}`}</span>
                </p>
                <p className="shadow-2xl font-semibold border text-center border-black rounded-lg p-2 mb-4">
                    Unread messages: <span className="rounded-full px-2 bg-black text-white font-bold py-1">{`${messages.length}`}</span>
                </p> */}
            </div>
            <hr />
            <Carousel>
                <CarouselContent>
                    {messages.map((singleMessage) => (
                        <CarouselItem key={singleMessage._id}>
                            <MessageCard
                                id={singleMessage._id}
                                name={singleMessage.sender?.name || "Unknown"}
                                senderId={singleMessage.sender?._id || "Unknown"}
                                email={singleMessage.sender?.email || "Unknown"}
                                message={singleMessage.message}
                                timeCreated={new Date(singleMessage.timestamp).toLocaleString()}
                            />
                        </CarouselItem>
                    ))}
                    {messages.length < 1 && (


                        <p className="pl-7 text-lg w-auto text-center text-slate-700 animate-pulse font-semibold">
                            Empty message
                        </p>
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default Message;
