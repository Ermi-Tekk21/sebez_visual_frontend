import Image from "next/image";
import Link from "next/link";
import React from "react";
import useAuthStore from "@/stores/AuthStore";
import { useCart } from "@/stores/cart-store";
import { useMemo } from "react";

interface Product {
  category: string;
  item_name: string;
  imageUrl: string;
  price: number;
  description: string;
  _id: string;
}

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!isOpen) return null;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Get isAuthenticated from useAuthStore
  const cart = useCart();
  const isAdded = useMemo(() => {
    return cart.cartProducts.some(
      (prod: { id: string }) => prod.id === product._id
    );
  }, [cart.cartProducts, product._id]);

  return (
    <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
          onClick={onClose}
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          ></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          ></path>
        </svg>
        <div className="flex gap-5">
          <Image
            src={product.imageUrl}
            alt={product.item_name}
            width={200}
            height={200}
          />
          <div>
            <span className="font-semibold text-green-900">
              {product.item_name.toUpperCase()}
            </span>
            <p className="my-5 text-sm font-thin">{product.description}</p>
            <div className="flex justify-between w-full">
              <span className="font-semibold text-xl text-green-900">
                ETB {product.price}
              </span>
              {isAuthenticated ? (
                <div className="bg-custom-green-b text-sm text-white px-3 py-2 rounded">
                  <button
                    onClick={() => {
                      isAdded
                        ? cart.removeFromCart(product._id)
                        : cart.addToCart(product);
                      onClose();
                    }}
                  >
                    {isAdded ? "Remove from cart" : "Add to cart"}
                  </button>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <div className="bg-custom-green-b text-sm text-white px-3 py-2 rounded">
                    <button
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
