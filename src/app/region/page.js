"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";

const regions = [
  { label: "India (₹ INR)", value: "IN", active: true },
  { label: "United Kingdom (£ GBP)", value: "UK", active: false },
  { label: "United States ($ USD)", value: "US", active: false },
  { label: "AED | اﻹﻣﺎرات | UAE", value: "UAE", active: false },
  { label: "Australia ($ AUD)", value: "AU", active: false },
  { label: "France (€ EUR)", value: "FR", active: false },
  { label: "Germany (€ EUR)", value: "DE", active: false },
  { label: "Japan (¥ JPY)", value: "JP", active: false },
];

export default function RegionSelectorPage() {
  const [selected, setSelected] = useState("IN");
  const router = useRouter();

  const handleContinue = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
        <span className="text-lg font-light tracking-[0.3em] uppercase">ZARA</span>
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 px-5 py-8">
        <h1 className="text-xl font-light tracking-wide mb-2">Select your region</h1>
        <p className="text-sm text-zinc-500 mb-8">
          We&apos;ll show you prices and availability for your location.
        </p>

        <div className="space-y-2">
          {regions.map((region) => (
            <button
              key={region.value}
              onClick={() => setSelected(region.value)}
              className={`w-full flex items-center justify-between px-4 py-4 border transition-all text-left ${
                selected === region.value
                  ? "border-black bg-zinc-50"
                  : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <span className="text-sm">{region.label}</span>
              {selected === region.value && (
                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                  <Check size={11} className="text-white" strokeWidth={2.5} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 border-t border-zinc-100">
        <button
          onClick={handleContinue}
          className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
