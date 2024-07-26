"use client"

import Image from "next/image";
import BackgroundImage from "../../../../../public/assets/images/hero.jpg";
import React from 'react';

const TransactionResult: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="Background"
         fill
           style={{ objectFit: "cover" }}
          className="opacity-40"
        />
      </div>
      <div className="bg-white z-20 shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Transaction Result</h1>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl text-green-600 font-semibold">Payment Successful</h2>
          <p className="text-gray-600 mt-2">Thank you for your purchase! Your transaction was completed successfully.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionResult;
