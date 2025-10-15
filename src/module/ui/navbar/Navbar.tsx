"use client";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCartStore, useUiStore } from "@/store";
import ShoppingCartPopup from "../modals/shoppingCart/ShoppingCartPopup";
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import logo from "@/asset/aye-pasteleria.jpeg";
import Image from "next/image";

export default function NavBar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const distinctCartItems = useCartStore((state) => state.getDistinctCount());
  const [isMounted, setIsMounted] = useState(false);
  const { theme, toggleTheme } = useUiStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className={`w-screen bg-fuchsia-700`}>
      <nav
        className={`py-4 px-8 flex justify-between items-center gap-5 transition-all duration-500`}
      >
        <Link href="/" className={``}>
          <Image src={logo} alt="" className="w-10 h-10 rounded-full" />
        </Link>
        <div
          className={`flex position-relative gap-4 justify-center items-center`}
        >
          <Link
            href="/favorite"
            className="relative w-[65px] font-bold after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[2px] after:bg-[#bcb9b2] after:transition-[width_.5s_cubic-bezier(0.5,0,0.3,1)] hover:after:w-[68px]"
          >
            Favorite
          </Link>
          <button
            className={`size-6 cursor-pointer`}
            onClick={toggleTheme}
            aria-label={`Cambiar a modo ${
              theme === "light" ? "oscuro" : "claro"
            }`}
          >
            {theme === "light" ? (
              <MdDarkMode size={"22px"} />
            ) : (
              <FaSun size={"22px"} />
            )}
          </button>
          <div
            className={`cursor-pointer hover:shadow-2xl`}
            onClick={() => setIsCartOpen(true)}
            aria-label={
              isMounted
                ? `Abrir carrito con ${distinctCartItems} productos distintos`
                : `Abrir carrito`
            }
          >
            <FaShoppingCart size={"22px"} />
            {isMounted && distinctCartItems > 0 && (
              <span
                className={`bg-red-500 absolute top-1 right-1 rounded-full py-0.5 px-1.5 text-sm`}
              >
                {distinctCartItems}
              </span>
            )}
          </div>
          <ShoppingCartPopup
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </nav>
    </header>
  );
}
