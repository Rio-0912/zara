"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";

const trending = ["LINEN", "WIDE LEG", "SUMMER DRESSES", "BLOCK HEELS"];
const recentlyViewed = [
  { name: "OVERSIZED BLAZER", price: "99.00 USD", img: null },
  { name: "LINEN TROUSERS", price: "79.00 USD", img: null },
  { name: "LEATHER JACKET", price: "129.00 USD", img: null },
];

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-200">
        <Search size={16} className="text-zinc-400 shrink-0" />
        {/* TODO: REPLACE WITH REAL API */}
        {/* GET /api/search?q={query}&region=IN */}
        {/* 300ms debounce on input before firing. Show skeleton grid during fetch. */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search styles, categories..."
          className="flex-1 text-sm outline-none placeholder:text-zinc-400"
        />
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
        <div>
          <p className="text-xs text-zinc-400 tracking-widest uppercase mb-3">Trending Searches</p>
          <div className="flex flex-wrap gap-2">
            {trending.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 border border-zinc-200 text-xs tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-zinc-400 tracking-widest uppercase mb-3">Recently Viewed</p>
          <div className="grid grid-cols-3 gap-3">
            {recentlyViewed.map((item) => (
              <div key={item.name} className="group cursor-pointer">
                <div className="w-full aspect-[3/4] bg-[#F5F5F5] mb-2 overflow-hidden flex items-center justify-center">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="text-zinc-300 text-2xl">⬜</div>
                  )}
                </div>
                <p className="text-xs font-medium tracking-wide leading-tight">{item.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-zinc-400 tracking-widest uppercase mb-3">You Might Also Like</p>
          <div className="relative aspect-video bg-zinc-900 flex items-end p-6 cursor-pointer group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative z-10">
              <p className="text-white text-lg font-light tracking-widest uppercase">New Collection</p>
              <button className="mt-2 text-white text-xs tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore the Edit <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
