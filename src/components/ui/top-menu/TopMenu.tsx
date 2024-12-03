"use client";

import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

import { titleFont } from "@/app/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { useEffect, useState } from "react";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  const [selected, setSelected] = useState<string>(""); // marcar filtro seleccionado
  const [loaded, setLoaded] = useState(false); // evitar error de hidratación

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link
          href={"/"}
          className={`m-2 p-2 rounded-md transition-all ${
            selected === "logo" ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelected("logo")}
        >
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link
          href="/gender/men"
          // className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          className={`m-2 p-2 rounded-md transition-all ${
            selected === "men" ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelected("men")}
        >
          <span className={`${titleFont.className}`}>Hombres</span>
        </Link>
        <Link
          href="/gender/women"
          // className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          className={`m-2 p-2 rounded-md transition-all ${
            selected === "women" ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelected("women")}
        >
          <span className={`${titleFont.className}`}>Mujeres</span>
        </Link>
        <Link
          href="/gender/kids"
          // className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          className={`m-2 p-2 rounded-md transition-all ${
            selected === "kids" ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelected("kids")}
        >
          <span className={`${titleFont.className}`}>Niños</span>
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          <span className={`${titleFont.className}`}>Menú</span>
        </button>
      </div>
    </nav>
  );
};
