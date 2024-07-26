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



  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{product.title}</CardTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => cart.removeFromCart(product.id)}
          >
            <X />
          </Button>
        </div>
        <div>
          <img src={product.image} alt={product.title} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p>{product.totalPrice}</p>
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => cart.minusProductAmount(product.id)}
              size="icon"
              variant="outline"
              disabled={product.amount <= 1}
            >
              <Minus />
            </Button>
            <span>{product.amount}</span>
            <Button
              onClick={() => cart.addProductAmount(product.id)}
              size="icon"
              variant="outline"
            >
              <Plus />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2"></CardFooter>
    </Card>
  );
}