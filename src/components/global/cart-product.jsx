"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/stores/cart-store"; // Adjust the import path as needed
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { X, Plus, Minus } from "lucide-react";

export default function CartProduct({ product }) {
  const cart = useCart();

  // Ensure correct usage of product id
  const handleRemove = () => cart.removeFromCart(product._id);
  const handleMinus = () => cart.minusProductAmount(product._id);
  const handlePlus = () => cart.addProductAmount(product._id);

  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{product.item_name}</CardTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRemove}
          >
            <X />
          </Button>
        </div>
        <div>
          <img src={product.imageUrl} alt={product.item_name} className="w-full h-auto" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 bg-slate-50  p-1 rounded-sm">
        <div className="bg-white px-2 rounded-md border-[0.5px] shadow-sm flex flex-col  gap-4">
<div className="flex justify-between">
                      <p className="text-gray-500">Price</p>
                      <span className="text-gray-800">
                        {product.totalPrice} ETB
                      </span>
                    </div>
</div>
<div className="bg-white px-2 rounded-md border-[0.5px] shadow-sm flex flex-col  gap-4">
 <div className="flex gap-4 justify-between py-2 items-center">
            <Button
              onClick={handleMinus}
              size="icon"
              variant="outline"
              disabled={product.amount <= 1}
            >
              <Minus />
            </Button>
            <span>{product.amount}</span>
            <Button
              onClick={handlePlus}
              size="icon"
              variant="outline"
            >
              <Plus />
            </Button>
          </div></div>         
        </div>
      </CardContent>
      <CardFooter className="space-x-2"></CardFooter>
    </Card>
  );
}
