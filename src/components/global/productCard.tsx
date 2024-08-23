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


interface Product {
  category: string;
  item_name: string;
  imageUrl: string;
  price: number;
  description: string;
  _id: string;
}
interface ProductCardProps {
  product: Product;
}



const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const cart = useCart();

  const isAdded = useMemo(() => {
    return cart.cartProducts.some((prod: Product) => prod._id === product._id);
  }, [cart.cartProducts, product._id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.item_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={product.imageUrl} alt={product.item_name} width={300} height={300} />
        <p>{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>{product.price} ETB</p>

        {isAuthenticated ? (
          <button
            className="bg-custom-green-b text-white px-3 py-2 rounded"
            onClick={() =>
              isAdded
                ? cart.removeFromCart(product._id)
                : cart.addToCart(product)
            }
          >
            {isAdded ? "remove from cart" : "add to cart"}
          </button>
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

