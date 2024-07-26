import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/stores/AuthStore";
import Link from "next/link";
import { useCart } from "@/stores/cart-store";
import { useMemo } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  artist: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  price,
  description,
  artist,
}: ProductCardProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Get isAuthenticated from useAuthStore
  const cart = useCart();
  const isAdded = useMemo(() => {
    return cart.cartProducts.find((prod: { id: string }) => prod.id === id);
  }, [cart.cartProducts, id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>by {artist}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Image src={image} alt={title} width={300} height={300} />
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>{price} ETB</p>

        {isAuthenticated ? (
          <div className="bg-custom-green-b text-white px-3 py-2 rounded">
            <button
              onClick={() =>
                isAdded
                  ? cart.removeFromCart(id)
                  : cart.addToCart({
                      id,
                      title,
                      image,
                      price,
                      description,
                      artist,
                    })
              }
            >
              {isAdded ? "remove from cart" : "add to cart"}
            </button>
          </div>
        ) : (
          <Link href="/auth/signin">
            <button className="bg-custom-green-b text-white px-3 py-2 rounded">
              {isAdded ? "remove from cart" : "add to cart"}
            </button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
