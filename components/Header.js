"use client";

import Image from "next/image";
import React from "react";
import Form from "next/form";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { BasketIcon } from "@sanity/icons";
import { useSelector } from "react-redux";
import { selectProductCountById } from "@/redux/productSlice";
import { SendHorizonal } from "lucide-react";

function Header() {
  const totalProductItems = useSelector(selectProductCountById);
  const { user } = useUser();
  console.log("total items", totalProductItems);
  return (
    <header className=" w-full shadow-md  p-4">
      <div className="mx-auto gap-4  flex flex-col md:flex-row items-center justify-center  shadow-lg shadow-emerald-100 pb-6">
        <div className="">
          <Link href="/" className="h-[180px] w-auto">
            <Image
              priority
              src="/Cool-Text-486471914731533.png"
              width={180}
              height={180}
              alt="logo image"
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex-1  w-full flex items-center  ">
          <Form
            action="/search "
            className="max-w-4xl mx-auto flex items-center flex-1 gap-2"
          >
            <input
              type="text"
              name="query"
              placeholder="search..."
              className="outline-none focus:ring-2 flex-1  rounded-sm ring-emerald-600 p-2 border w-full"
            />
            <Button type="submit" className="bg-emerald-500 p-4">
              <SendHorizonal size={80} />
            </Button>
          </Form>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/basket" className="flex items-center relative">
            <Button className="bg-emerald-500 px-2 py-1 flex-1 rounded-sm hover:bg-emerald-700 text-white font-semibold md:font-2xl">
              <BasketIcon className="w-4 h-4" />
              MY BASKET
            </Button>
            <div className="absolute -top-3 -right-2 text-white px-2 rounded-full text-sm bg-red-500 ">
              {totalProductItems}
            </div>
          </Link>
          <Link href="/orders">
            <Button className="bg-emerald-500 px-2 py-1 cursor-pointer flex-1 rounded-sm hover:bg-emerald-700 text-white font-semibold md:font-2xl">
              MY ORDERS
            </Button>
          </Link>
          <SignedOut className="relative">
            <SignInButton
              mode="modal"
              className="bg-emerald-500 px-2 py-1 rounded-md cursor-pointer hover:bg-emerald-700 text-white font-semibold md:font-2xl"
            >
              <Button className="bg-emerald-500 px-2 py-1 cursor-pointer rounded-md hover:bg-emerald-700 text-white font-semibold md:font-2xl">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-emerald-500 cursor-pointer px-2 py-1 rounded-md hover:bg-emerald-700 text-white font-semibold md:font-2xl">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
            <div>
              <h1 className="text-gray-600">Welcome Back!!</h1>
              <span className="font-semibold">
                {user?.firstName + " " + user?.fullName}
              </span>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Header;
