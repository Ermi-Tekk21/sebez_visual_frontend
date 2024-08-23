"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BackgroundImage from "../../../../public/assets/images/hero.jpg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import DeleteModal from "@/components/global/DeleteModal";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies

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
  const [prodIdToDelete, setProdIdToDelete] = useState<string | null>(null);
  const [isModalOpenDel, setModalOpenDel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dotenv = require("dotenv");
  dotenv.config();

  const handleOpenModalDel = (productId: string) => {
    setProdIdToDelete(productId);
    setModalOpenDel(true);
  };

  const handleCloseModalDel = () => {
    setProdIdToDelete(null);
    setModalOpenDel(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = Cookies.get("token"); // Get token from cookies
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
  }, []); // Empty dependency array to run once on mount

  const handleDelete = async () => {
    const token = Cookies.get("token"); // Get token from cookies
    try {
      if (!token) {
        throw new Error("Access denied. No token provided.");
      }

      const response = await axios.delete(
        `${process.env.SEBEZ_ENDPOINT}/api/product/deleteProduct/${prodIdToDelete}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 202) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== prodIdToDelete)
        );
        toast({
          variant: "default",
          description: "Product deleted successfully",
        });
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
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.response.data.message}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Something went wrong",
        });
      }
    } finally {
      handleCloseModalDel();
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
      <div className="bg-white z-10 p-8 rounded shadow-md w-full max-w-4xl opacity-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-600 border border-red-300 rounded">
            {error}
          </div>
        )}
        <ScrollArea className="h-[400px] max-sm:[400px] rounded-md border">
          <table className="w-full table-auto overflow-x-scroll">
            <thead className="sticky top-0 bg-white bg-opacity-95">
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
                  <td className="border px-4 py-2 flex justify-center">
                    <button
                      onClick={() => handleOpenModalDel(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200 mr-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
      {isModalOpenDel && (
        <DeleteModal
          isOpen={isModalOpenDel}
          onClose={handleCloseModalDel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default GetProducts;
