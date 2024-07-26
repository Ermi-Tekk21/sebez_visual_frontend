"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BackgroundImage from "../../../../public/assets/images/hero.jpg";
import useAuthStore from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
const dotenv = require("dotenv");
dotenv.config();

type Product = {
  _id: string;
  category: string;
  item_name: string;
  description: string;
  quantity: number;
  price: string;
};

const GetProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get<Product[]>(
          `${process.env.SEBEZ_ENDPOINT}/api/product/getallProducts`,
          {
            headers: {
              "x-auth-token": token || "",
            },
          }
        );
        setProducts(response.data);
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong");
        }
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        throw new Error("Access denied. No token provided.");
      }

      const response = await axios.delete(
        `${process.env.SEBEZ_ENDPOINT}/api/product/deleteProduct/${productId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 202) {
        // Update local state after successful deletion
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        setMessage("Product deleted successfully");
      } else {
        throw new Error("Failed to delete product.");
      }
    } catch (error: any) {
      console.error("Error deleting product:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src={BackgroundImage}
          alt="Background"
         fill
           style={{ objectFit: "cover" }}
          className="opacity-40 z-0"
        />
      </div>
      <div className="bg-white z-10 p-8 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price in ETB</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="bg-gray-50">
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.item_name}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200 mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetProducts;
