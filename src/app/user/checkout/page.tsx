"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../../../stores/cart-store";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import AcceptPayment from "@/components/payment/payment";
import { toast } from "@/components/ui/use-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [totalSum, setTotalSum] = useState(0);
  const cart = useCart();

  const [txRef, setTxRef] = useState<string>("");

  useEffect(() => {
    const sum = cart.checkout.reduce(
      (sum: number, item: { totalPrice: number }) => sum + item.totalPrice,
      0
    );
    setTotalSum(sum);
    if (sum === 0) {
      router.push("/user");
    }
  }, [cart.checkout, router]);

  useEffect(() => {
    const uniqueRef = `tx-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setTxRef(uniqueRef);
  }, []);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !city ||
      !state ||
      !zipCode
    ) {
      toast({
        variant: "default",
        description: "Please fill in all required fields",
      });
      return;
    }
    // Here you might handle other form submission logic if necessary
    e.currentTarget.submit();
  };

  return (
    <div className="flex max-sm:flex-col gap-2 items-center bg-gray-900 sm:p-24">
      <div className="bg-white shadow-lg rounded-lg max-sm:p-11 sm:p-6 max-sm:mt-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
          Order Summary
        </h2>
        <div className="mt-6 bg-gray-800 text-white rounded-lg p-4 flex justify-between items-center">
          <h4 className="text-lg font-bold">Total price</h4>
          <span className="text-xl font-semibold animate-pulse">{totalSum} ETB</span>
        </div>
        <div className="h-[400px] overflow-y-auto pe-3">
          {/* {cart.checkout.map((product) => ( */}

          {cart.checkout.map(
            (product: {
              id: React.Key | null | undefined;
              image: string | undefined;
              title:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              amount:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
              totalPrice:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
            }) => (
              <div
                key={product.id}
                className="grid sm:grid-cols-2 gap-6 border border-gray-200 rounded-lg mb-4 p-4 items-center"
              >
                <div className="px-4 py-6 bg-gray-100 rounded-md">
                  <img
                    src={product.image}
                    alt={String(product.title) ?? ""}
                    className="w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-semibold text-gray-800">
                    {product.title}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-gray-500">Quantity</div>
                    <span className="text-gray-800">{product.amount}</span>
                  </div>
                  <div className="flex gap-6 mt-4">
                    <p className="text-gray-500">Total Price</p>
                    <span className="text-gray-800">
                      {product.totalPrice} ETB
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-12 justify-center items-center m-auto align-center">
       
        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6">
          Complete your order
        </h2>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          method="POST"
          action="https://api.chapa.co/v1/hosted/pay"
        >
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Personal Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
                  value={firstName}
                  onChange={handleInputChange(setFirstName)}
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full te xt-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
                  value={lastName}
                  onChange={handleInputChange(setLastName)}
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  placeholder="Phone No."
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
                  value={phoneNumber}
                  onChange={handleInputChange(setPhoneNumber)}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Billing Address
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Address"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
                  value={address}
                  onChange={handleInputChange(setAddress)}
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
                  value={city}
                  onChange={handleInputChange(setCity)}
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="State"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
                  value={state}
                  onChange={handleInputChange(setState)}
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 outline-none"
                  value={zipCode}
                  onChange={handleInputChange(setZipCode)}
                />
              </div>
            </div>
          </div>
          <AcceptPayment
            firstName={firstName}
            lastName={lastName}
            email={email}
            phoneNumber={phoneNumber}
            totalPrice={totalSum}
            address={address}
            city={city}
            state={state}
            zipCode={zipCode}
            txRef={txRef}
            userId={""}
          />
          <Button
            type="submit"
            className="w-full text-center bg-gray-800 text-white rounded-md py-3.5"
          >
            Pay Now
          </Button>
        </form>
      </div>
    </div>
  );
}
