"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { kidsProducts } from "@/lib/data";

const ageGroups = [
  { label: "GIRL 6-14 YRS", href: "#", bg: "bg-zinc-900" },
  { label: "BOY 6-14 YRS", href: "#", bg: "bg-teal-900" },
  { label: "GIRL 1½-6 YRS", href: "#", bg: "bg-rose-200" },
  { label: "BOY 1½-6 YRS", href: "#", bg: "bg-zinc-700" },
];

export default function KidsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-zinc-100 max-w-screen-2xl mx-auto">
          <h1 className="text-sm font-medium tracking-widest uppercase">KIDS</h1>
        </div>

        <div className="px-4 md:px-8 py-4 bg-zinc-50 border-b border-zinc-100">
          <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border border-zinc-400 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-zinc-400" />
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide">Find the right size</p>
                <p className="text-[10px] text-zinc-500">Age & size guide for all categories</p>
              </div>
            </div>
            <button className="text-[10px] tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all">
              View Guide <ArrowRight size={10} />
            </button>
          </div>
        </div>

        <div className="px-4 md:px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 gap-3 mb-8">
            {ageGroups.map((group) => (
              <Link key={group.label} href={group.href} className="group relative">
                <div className={`aspect-[4/3] ${group.bg} relative overflow-hidden flex items-end p-4`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="relative z-10 text-white text-[10px] tracking-widest uppercase font-medium">
                    {group.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {kidsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <BottomNav active="HOME" />
    </div>
  );
}
