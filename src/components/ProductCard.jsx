"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5]">
            <div className="text-zinc-300 text-4xl">⬜</div>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            className={wishlisted ? "fill-black text-black" : "text-black"}
            strokeWidth={1.5}
          />
        </button>

        {product.isNew && (
          <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase bg-white px-2 py-1 font-medium">
            New
          </span>
        )}
      </div>

      <div className="pt-3 pb-1">
        <p className="text-xs tracking-wide text-zinc-800 uppercase font-light leading-snug line-clamp-2">
          {product.name}
        </p>
        <p className="text-xs text-zinc-500 mt-1">{product.price}</p>

        {product.colors && (
          <div className="flex items-center gap-1 mt-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onMouseEnter={() => setHoveredColor(color)}
                onMouseLeave={() => setHoveredColor(null)}
                onClick={(e) => e.preventDefault()}
                className="w-3 h-3 rounded-full border border-zinc-300 transition-transform hover:scale-125"
                style={{ backgroundColor: color }}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
