"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";
import NavigationMenu from "./NavigationMenu";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, isLoaded } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-100">
        <div className="flex items-center justify-between h-14 px-4 md:px-8 max-w-screen-2xl mx-auto">
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl font-light tracking-[0.35em] uppercase select-none"
          >
            ZARA
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Link
              href="/wishlist"
              className="w-9 h-9 hidden sm:flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={18} />
            </Link>
            <Link
              href="/bag"
              className="w-9 h-9 flex items-center justify-center hover:bg-zinc-50 rounded-full transition-colors relative"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={18} />
              {isLoaded && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[9px] font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {menuOpen && <NavigationMenu onClose={() => setMenuOpen(false)} />}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}
