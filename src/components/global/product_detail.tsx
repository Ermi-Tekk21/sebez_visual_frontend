import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import useAuthStore from "@/stores/AuthStore";
import { useCart } from "@/stores/cart-store";

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

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const cart = useCart();

  const isAdded = useMemo(() => {
    return cart.cartProducts.some((prod: Product) => prod._id === product._id);
  }, [cart.cartProducts, product._id]);

  return (
    <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <button
          aria-label="Close"
          className="absolute top-4 right-4 w-3.5 h-3.5 text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            viewBox="0 0 320.591 320.591"
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
        </button>
        <div className="flex gap-5 max-sm:flex-col">
          <Image
            src={product.imageUrl}
            alt={product.item_name}
            width={200}
            height={200}
            className="rounded"
          />
          <div>
            <span className="font-semibold text-green-900">
              {product.item_name.toUpperCase()} 
            </span><div className="bg-white my-2 justify-between px-2 rounded-md border-[0.5px] text-sm font-mono shadow-sm flex items-center font-semibold text-gray-800">
                    {product.category}<span className="text-xs font-extralight">(catagory)</span>
                  </div>
            <p className="my-5 text-sm font-thin">{product.description}</p>
            
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold text-xl text-green-900">
                ETB {product.price}
              </span>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    isAdded
                      ? cart.removeFromCart(product._id)
                      : cart.addToCart(product);
                    onClose();
                  }}
                  className="bg-custom-green-b text-sm text-white px-3 py-2 rounded"
                >
                  {isAdded ? "Remove from cart" : "Add to cart"}
                </button>
              ) : (
                <Link legacyBehavior href="/auth/signin">
                  <a
                    onClick={() => onClose()}
                    className="bg-custom-green-b text-sm text-white px-3 py-2 rounded"
                  >
                    Add to cart
                  </a>
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
