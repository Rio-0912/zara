"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";

const SORT_OPTIONS = [
  "Newest First",
  "Price: Low to High",
  "Price: High to Low",
  "Best Sellers",
];

const PRICE_CATEGORIES = ["Dresses", "Tops", "Knitwear", "Trousers", "Coats", "Shoes"];

export default function CategoryPage({
  title,
  products,
  categories,
  navActive,
}) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("Newest First");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 8000]);

  const filterTabs = ["ALL", "NEW IN", ...(categories || PRICE_CATEGORIES)];

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = products.filter((p) => {
    if (activeFilter !== "ALL" && activeFilter !== "NEW IN") {
      if (p.category?.toUpperCase() !== activeFilter.toUpperCase()) return false;
    }
    if (activeFilter === "NEW IN" && !p.isNew) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-zinc-100 max-w-screen-2xl mx-auto">
          <h1 className="text-sm font-medium tracking-widest uppercase">{title}</h1>
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 text-xs tracking-widest uppercase hover:text-zinc-500 transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>

        <div className="flex gap-4 px-4 md:px-8 py-3 overflow-x-auto scrollbar-hide border-b border-zinc-100 max-w-screen-2xl mx-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`whitespace-nowrap text-xs tracking-widest uppercase py-1.5 px-3 transition-all shrink-0 ${
                activeFilter === tab
                  ? "bg-black text-white"
                  : "text-zinc-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-4 md:px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-zinc-400 text-sm tracking-wide">No products found</p>
            </div>
          )}
        </div>
      </main>

      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="flex-1 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="w-80 bg-white h-full flex flex-col overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <span className="text-xs font-medium tracking-widest uppercase">Filters</span>
              <button
                onClick={() => setShowFilters(false)}
                className="text-xs tracking-widest uppercase text-zinc-400 hover:text-black transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="w-7 h-7 flex items-center justify-center hover:bg-zinc-100 rounded-full"
              >
                <X size={14} />
              </button>
            </div>

            <div className="px-6 py-6 border-b border-zinc-100">
              <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-4">Sort By</p>
              <div className="space-y-3">
                {SORT_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm group-hover:text-black transition-colors">{option}</span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        sort === option ? "border-black" : "border-zinc-300"
                      }`}
                      onClick={() => setSort(option)}
                    >
                      {sort === option && (
                        <div className="w-2 h-2 rounded-full bg-black" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 py-6 border-b border-zinc-100">
              <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-4">Category</p>
              <div className="space-y-3">
                {PRICE_CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                        selectedCategories.includes(cat)
                          ? "bg-black border-black"
                          : "border-zinc-300"
                      }`}
                      onClick={() => toggleCategory(cat)}
                    >
                      {selectedCategories.includes(cat) && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm group-hover:text-black transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 py-6 border-b border-zinc-100">
              <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-4">Price Range</p>
              <input
                type="range"
                min={500}
                max={20000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                className="w-full accent-black"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2">
                <span>₹ {priceRange[0].toLocaleString()}</span>
                <span>₹ {priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            <div className="px-6 py-6 mt-auto">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
              >
                Show Results ({filtered.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active={navActive} />
    </div>
  );
}
