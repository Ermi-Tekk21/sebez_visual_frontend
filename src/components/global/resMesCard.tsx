import React, { useState } from 'react';

// Define the types for your message prop
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

interface ResMesCardProps {
    message: Message;
}

const ResMesCard: React.FC<ResMesCardProps> = ({ message }) => {
    const [details, setDetails] = useState<boolean>(false);
    // console.log("Res:" + message.replayMessageId.message);

    return (
        
        <div className='shadow-sm text-slate-900'>
            <div>
               <div className='bg-slate-50 border-[0.5px] border-blue-950 p-2 rounded-tr-lg'>
                <div className='flex flex-col items-end'>
                    <div className='text-sm w-3/4'><p className='text-xs text-center'>{message.reciver.name} | user</p>
                    {message.replayMessageId && 
                    (
                        <div className='border-[0.5px] border-indigo-950  px-2 rounded-md'>
                            {message.replayMessageId.message}
                        </div>
                    )}
                      {!message.replayMessageId && 
                    (
                        <div className='border-[0.5px] border-red-500 text-red-500  px-2 rounded-md'>
                            message deleted
                        </div>
                    )}  
                    </div>
                    {details && (
                        <div className='text-xs flex pl-1 flex-col gap-2'>
                            <ul>
                                <li>Timestamp: {new Date(message.timestamp).toLocaleString()}</li>
                                <li>Email: {message.reciver.email}</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className='flex flex-col items-start w-3/4'>
                    <div><p className='text-xs text-center'>{message.sender.name} | Admin</p> <div className='text-sm border-[0.5px] border-indigo-950  px-2 rounded-md'>{message.message}</div></div>
                    {details && (
                        <div className='flex pl-4 text-xs flex-col gap-2'>
                            <ul>
                                <li>Email: {message.sender.email}</li>
                                <li>Timestamp: {new Date(message.timestamp).toLocaleString()}</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-between'>
                <button
                    onClick={() => setDetails(!details)}
                    className='border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-blue-950 px-2 py-1 rounded-b-md bg-indigo-950 text-white hover:font-semibold'>
                    {details ? 'Hide details' : 'Show details'}
                </button>
                {/* <button
                    className='border-b-[0.5px] border-l-[0.5px] border-r-[0.5px] border-red-500 px-2 py-1 rounded-b-md bg-red-500 text-white hover:font-semibold'>
                    Delete
                </button> */}
            </div>  
            </div>
           
        </div>
    );
};

export default ResMesCard;
