"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { womanProducts, manProducts } from "@/lib/data";

const heroSlides = [
  {
    id: 1,
    tag: "LATEST TRENDS",
    image: "/models/banner/image.png",
    gradient: "from-zinc-900/60 via-zinc-800/30 to-transparent",
    bg: "bg-neutral-100",
  },
  {
    id: 2,
    tag: "SUMMER ESSENTIALS",
    image: "/models/banner/image copy.png",
    gradient: "from-zinc-900/60 via-zinc-800/30 to-transparent",
    bg: "bg-neutral-100",
  },
  {
    id: 3,
    tag: "NEW COLLECTION",
    image: "/models/banner/image copy 2.png",
    gradient: "from-zinc-900/60 via-zinc-800/30 to-transparent",
    bg: "bg-neutral-100",
  },
  {
    id: 4,
    tag: "NEW IN — WOMAN",
    image: "/models/female/image copy 4.png",
    gradient: "from-rose-900/30 via-pink-800/20 to-transparent",
    bg: "bg-gradient-to-br from-rose-100 via-pink-50 to-zinc-100",
  },
  {
    id: 5,
    tag: "NEW IN — MAN",
    image: "/models/males/image copy 2.png",
    gradient: "from-zinc-900/30 via-zinc-800/20 to-transparent",
    bg: "bg-gradient-to-br from-zinc-200 via-zinc-100 to-white",
  },
];

const featuredCategories = [
  { label: "WOMAN", href: "/woman", bg: "bg-gradient-to-br from-rose-200 via-pink-100 to-pink-50" },
  { label: "MAN", href: "/man", bg: "bg-gradient-to-br from-zinc-300 via-zinc-200 to-zinc-100" },
  { label: "KIDS", href: "/kids", bg: "bg-gradient-to-br from-purple-200 via-violet-100 to-pink-50" },
  { label: "PERFUMES", href: "/perfumes", bg: "bg-gradient-to-br from-amber-100 via-orange-50 to-rose-50" },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  const goTo = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const trendingProducts = [...womanProducts.slice(0, 2), ...manProducts.slice(0, 2)];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        <section className="relative w-[390px] h-[480px] max-w-full mx-auto overflow-hidden">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              } ${slide.bg}`}
            >
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className="w-full h-full object-cover object-top"
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-t ${slide.gradient}`} />

              <div className="absolute bottom-10 left-6 md:left-10 z-20">
                <span className="inline-block bg-black text-white text-[10px] tracking-widest uppercase px-3 py-1.5 mb-4 font-medium">
                  {slide.tag}
                </span>
                <div>
                  <Link
                    href="#"
                    className="text-white text-sm tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all duration-300 font-light"
                  >
                    SHOP NOW <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentSlide ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-colors rounded-full"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={() => goTo((currentSlide + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center transition-colors rounded-full"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </section>

        <section className="px-4 md:px-8 py-10 max-w-screen-2xl mx-auto">
          <p className="text-xs text-zinc-400 tracking-widest uppercase mb-5">Featured Categories</p>
          <div className="grid grid-cols-4 gap-3">
            {featuredCategories.map((cat) => (
              <Link key={cat.label} href={cat.href} className="group">
                <div className={`aspect-square ${cat.bg} flex items-end p-3 overflow-hidden relative`}>
                  <span className="text-[10px] tracking-widest uppercase font-medium text-zinc-700 group-hover:text-black transition-colors">
                    {cat.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 md:px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-zinc-400 tracking-widest uppercase">Trending Now</p>
            <Link href="/woman" className="text-xs tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all">
              See all <ArrowRight size={12} />
            </Link>
          </div>
          {/* TODO: REPLACE WITH REAL API */}
          {/* GET /api/recommendations?userId=&region=IN&limit=8 */}
          {/* Show skeleton shimmer during load */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="relative h-[70vh] overflow-hidden my-4">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700">
            <Image
              src="/models/males/image copy.png"
              alt="The Suit Collection"
              fill
              className="object-cover object-top opacity-60 mix-blend-luminosity"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-6 md:left-16 right-6 md:right-16 z-10 text-center">
            <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-3">Editorial</p>
            <h2 className="text-white text-4xl md:text-6xl font-light tracking-[0.15em] uppercase mb-4">
              The Suit<br />Collection
            </h2>
            <p className="text-white/70 text-sm font-light max-w-md mx-auto mb-8 leading-relaxed">
              Refined silhouettes and premium fabrics for the modern wardrobe.
              Exploration of form through minimalist tailoring.
            </p>
            <Link
              href="/man"
              className="inline-flex items-center gap-3 border border-white text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
            >
              VIEW COLLECTION
            </Link>
          </div>
        </section>

        <section className="px-4 md:px-8 py-10 max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-zinc-400 tracking-widest uppercase">Woman</p>
            <Link href="/woman" className="text-xs tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {womanProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="px-4 md:px-8 py-10 max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-zinc-400 tracking-widest uppercase">Man</p>
            <Link href="/man" className="text-xs tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {manProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="bg-zinc-50 mx-4 md:mx-8 mb-10 p-8 md:p-16 text-center">
          <p className="text-xs text-zinc-400 tracking-[0.3em] uppercase mb-3">JOIN</p>
          <h2 className="text-2xl md:text-4xl font-light tracking-widest uppercase mb-4">ZARA Newsletter</h2>
          <p className="text-sm text-zinc-500 mb-8 max-w-sm mx-auto">
            Be the first to know about our new collections and exclusive offers.
          </p>
          <div className="flex gap-0 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-zinc-300 border-r-0 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
            />
            <button className="bg-black text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors">
              JOIN
            </button>
          </div>
        </section>
      </main>

      <BottomNav active="HOME" />
    </div>
  );
}
