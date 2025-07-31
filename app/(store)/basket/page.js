"use client";
import stripCheckOutSession from "@/actions/stripeCheckOutSession";
import ProductQuantityModify from "@/components/ProductQuantityModify";
import {
  selectAllProductsInBasket,
  selectProductCountById,
  selectProductsTotal,
} from "@/redux/productSlice";
import { urlFor } from "@/sanity/lib/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useSelector } from "react-redux";

function BasketPage() {
  const router = useRouter();
  const totalBasketCount = useSelector(selectProductCountById);
  const items = useSelector(selectAllProductsInBasket);
  const totalBasket = useSelector(selectProductCountById);
  const priceTotal = useSelector(selectProductsTotal);
  const [isLoading, startTransition] = useTransition();
  const { isSignedIn } = useUser();


  const handlCheckOutPayment = async () => {
    if (!isSignedIn || !items.length) return;

    startTransition(async () => {
      try {
 
        const checkoutUrl = await stripCheckOutSession(items);

        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    });
  };

  if (totalBasketCount === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col item-scenter justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 mt-4 bg-gray-100 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {items.map((item) => (
            <div
              key={item._id}
              className="mb-4 p-4 bg-white border rounded flex items-center justify-between"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/product/${item.productslug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:h-24 sm:w-24 flex-shrink-0 mr-4">
                  {item.image && (
                    <Image
                      src={urlFor(item.image[0]).url()}
                      alt={item.name ?? "Product image"}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-semibold truncate">
                    {item.name}
                  </h1>
                  <p className="text-sm sm:text-base">
                    Price : R{""}
                    {item.hasDiscount
                      ? item.discountPrice
                      : (item.price ?? 0)}{" "}
                    * {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center ml-4 flex-shrink-0">
                <ProductQuantityModify product={item} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg-left-auto">
          <h3 className="text-xl font-semibold border-b border-gray-300">
            Order Summary
          </h3>
          <div className="mt-6 space-y-2">
            <p className="flex justify-between">
              <span>Items</span>
              <span>{totalBasket}</span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total</span>
              <span>R{priceTotal.toFixed(2)}</span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handlCheckOutPayment}
              disabled={isLoading}
              className="mt-4 w-full bg-emerald-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-emerald-600 disabled:bg-gray-400"
            >
              {isLoading ? "Procesing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton
              mode="modal"
              className="mt-4 w-full bg-emerald-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-emerald-600"
            >
              Sign In To Checkout
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0"></div>
      </div>
    </div>
  );
}

export default BasketPage;

