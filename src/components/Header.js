import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { getSession } from "next-auth/client";

function Header(props) {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Custom search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            placeholder={
              router.route === "/" ? "🔎 Search in products listed below…" : ""
            }
            onInput={(event) =>
              router.route === "/" && props.onSearchValue(event.target.value)
            }
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/*Right */}
        <div className=" text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={!session ? signIn : signOut}
            className=" cursor-pointer link"
          >
            <p className="hover:underline">
              {session ? `Hello, ${session.user.name}` : "sign in"}
            </p>
            <p className="font-extrabold md:text-sm">Account & List</p>
          </div>

          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          {/*ShoppingCart */}
          <div
            onClick={() => router.push("/checkout")}
            className="link relative flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline mt-2font-extrabold md:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* buttom Nav */}
      <div className="flex space-x-2 p-2 pl-6 items-center bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className=" lg:inline-flex hidden">Electronics</p>
        <p className=" lg:inline-flex hidden">Food & Grocery</p>
        <p className=" lg:inline-flex hidden">Prime</p>
        <p className=" lg:inline-flex hidden">Buy Again</p>
        <p className=" lg:inline-flex hidden">Shoper Toolkit</p>
        <p className=" lg:inline-flex hidden">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;

//solving refreshing/breaking issues
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
