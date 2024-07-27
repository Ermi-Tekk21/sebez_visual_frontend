"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { useCart } from "../../stores/cart-store";
import React from "react";
import CartProduct from "./cart-product";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "../../../src/lib/utils";
import Image from "next/image";
import cartSvg from "../../../public/assets/icons/cart.svg";

interface CartProps { 
  url?: string; // Make the URL prop optional
}

const Cart: React.FC<CartProps> = ({ url }) => {
  const cart = useCart();

  const totalSum = (): number => {
    let sum = 0;
    cart.cartProducts.forEach((item: { totalPrice: number; }) => {
      sum += item.totalPrice;
    });
    return sum;
  };

  const sum = totalSum();
  const pathname = usePathname();
  const ischeckout = pathname === "/user/checkout";
  return (
    <Sheet>
      <SheetTrigger className="relative">
        {url ? (
          <Button
            className="font-semibold text-slate-400"
            onClick={() => cart.revert()}
          >
            Edit
          </Button>
        ) : (
          <div className="relative">
            <span>
              <Image src={cartSvg} alt="" width={30} height={30} />
            </span>
            {!ischeckout && (
              <span className="absolute text-white left-2 bg-red-500 top-0 translate-x-1/2 -translate-y-1/2 px-2   rounded-full">
                {cart.cartProducts.length}
              </span>
            )}
          </div>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Here is your cart</SheetTitle>
          <div className="h-screen overflow-y-auto pe-3">
            {cart.cartProducts.map((product: { id: React.Key | null | undefined; }) => (
              <CartProduct key={product.id} product={product} />
            ))}
            {!cart.cartProducts.length && (
              <div className="flex flex-col gap-10 w-full h-full justify-center items-center">
                <img
                  src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp"
                  alt=""
                />
                <h1 className="text-center mt-6 text-red-500 animate-pulse">
                  Your cart is empty
                </h1>
                <SheetTrigger asChild>
                  <Link href="/user/#product">
                    <Button>Go To Shop</Button>
                  </Link>
                </SheetTrigger>
              </div>
            )}
          </div>

          {cart.cartProducts.length > 0 && (
            <div className="flex flex-col absolute bottom-0 left-0 w-full bg-slate-700 p-4  justify-between items-center text-white">
              <h4 className="text-white">
                Total price: <span className="ml-auto">{sum} birr</span>
              </h4>
              <SheetTrigger asChild>
                <Link
                  onClick={() => cart.removeProducts()}
                  className={cn(buttonVariants(), "w-full")}
                  href="/user/checkout"
                >
                  Checkout
                </Link>
              </SheetTrigger>
            </div>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
