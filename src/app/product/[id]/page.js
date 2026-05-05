"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ChevronLeft, Plus, Minus, X, ArrowRight, Scan } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Product3DModel from "@/components/Product3DModel";
import { featuredProduct, womanProducts } from "@/lib/data";

const galleryImages = [
  "/models/females/image copy.png",
  "/models/males/image copy 2.png",
  "/models/males/image copy 3.png",
  "/models/males/image copy 4.png",
  "/models/males/image copy 5.png",
];

import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const product = featuredProduct;
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [wishlistAnim, setWishlistAnim] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const handleWishlistToggle = () => {
    setWishlisted(!wishlisted);
    setWishlistAnim(true);
    setToastMessage(!wishlisted ? "Added to wishlist" : "Removed from wishlist");
    setTimeout(() => setWishlistAnim(false), 150);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleTryOn = () => {
    // Navigate to AR Try On and pass state
    // We pass state using query parameters since Next.js App Router doesn't natively support state in router.push like react-router
    const params = new URLSearchParams({
      productId: product.id,
      productName: product.name,
      currentColor: selectedColor.name,
      currentSize: selectedSize || "M",
      productImage: product.image || "/models/female/image copy.png"
    });
    router.push(`/ar-tryon?${params.toString()}`);
  };

  const handleAddToBag = () => {
    if (!selectedSize) return;
    
    const numPrice = Number(product.price.replace(/[^0-9.]/g, ""));
    // Convert USD roughly if needed, otherwise use raw number
    const finalPrice = product.price.includes("USD") ? Math.round(numPrice * 80) : numPrice;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image || "/models/female/image copy.png"
    }, selectedSize, selectedColor.name);

    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const sizeGuideRows = [
    { age: "6Y-7Y", height: "122 cm", chest: "62 cm", waist: "57 cm" },
    { age: "8Y-9Y", height: "134 cm", chest: "67 cm", waist: "60 cm" },
    { age: "10Y-11Y", height: "146 cm", chest: "73 cm", waist: "63 cm" },
    { age: "12Y-13Y", height: "158 cm", chest: "80 cm", waist: "66 cm" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pb-16 md:pb-0 relative z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-[1fr_480px] gap-0">
            <div className="relative">
              <div className="relative aspect-[3/4] md:aspect-auto md:h-[85vh] md:sticky md:top-14 bg-zinc-100 overflow-hidden">
                <Image
                  src={product.image || "/models/female/image copy.png"}
                  alt={product.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Heart
                    size={20}
                    className={wishlisted ? "fill-black text-black" : "text-black"}
                    strokeWidth={1.5}
                  />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === activeImage ? "bg-black w-4" : "bg-black/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden md:flex gap-2 p-4 overflow-x-auto scrollbar-hide">
                {[product.image, "/models/males/image copy 2.png", "/models/males/image copy 3.png", "/models/males/image copy 4.png", "/models/males/image copy 5.png"].map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-16 h-20 relative overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-black" : "border-transparent"
                    }`}
                  >
                    {src ? (
                      <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                    ) : (
                      <div className="w-full h-full bg-zinc-200" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 py-6 md:px-10 md:py-10 md:overflow-y-auto">
              <Link
                href="/woman"
                className="hidden md:flex items-center gap-1 text-xs text-zinc-400 tracking-wider mb-6 hover:text-black transition-colors"
              >
                <ChevronLeft size={12} />
                {product.category}
              </Link>

              <h1 className="text-base font-light tracking-wide uppercase mb-1">{product.name}</h1>
              <p className="text-xl font-light mb-6">{product.price}</p>

              <div className="mb-6">
                <p className="text-[10px] tracking-widest uppercase text-zinc-500 mb-3">
                  COLOUR: {selectedColor.name}
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full transition-all border-2 ${
                        selectedColor.name === color.name
                          ? "border-black scale-110"
                          : "border-zinc-200 hover:border-zinc-400"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-widest uppercase text-zinc-500">SIZE</p>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[10px] tracking-widest uppercase underline hover:text-zinc-500 transition-colors flex items-center gap-1"
                  >
                    SIZE GUIDE <ArrowRight size={10} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[52px] h-12 border text-xs tracking-wider uppercase transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-zinc-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-[10px] text-zinc-400 mt-2 tracking-wide">Please select a size</p>
                )}
              </div>

              {toastMessage && (
                <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 text-xs z-50 transition-opacity">
                  {toastMessage}
                </div>
              )}

              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleWishlistToggle}
                  className="w-14 h-14 border border-zinc-300 flex items-center justify-center hover:border-black transition-colors"
                >
                  <Heart
                    size={18}
                    className={`transition-transform duration-150 ${wishlistAnim ? "scale-130" : "scale-100"} ${wishlisted ? "fill-black text-black" : "text-black"}`}
                    strokeWidth={1.5}
                  />
                </button>
                <button
                  onClick={handleTryOn}
                  className="flex-1 relative z-10 border border-zinc-300 py-4 text-xs tracking-widest uppercase hover:border-black transition-colors flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
                >
                  <Scan size={16} /> TRY ON
                </button>
                <button
                  onClick={handleAddToBag}
                  className={`flex-1 py-4 text-xs tracking-widest uppercase transition-all ${
                    addedToBag
                      ? "bg-zinc-700 text-white"
                      : selectedSize
                      ? "bg-black text-white hover:bg-zinc-800"
                      : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  {addedToBag ? "Added ✓" : "Add to Bag"}
                </button>
              </div>

              <div
                onClick={handleTryOn}
                className="flex items-center justify-between bg-zinc-50 p-4 mb-8 cursor-pointer hover:bg-zinc-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Scan size={18} />
                  <span className="text-xs tracking-widest uppercase">See how this looks on you — TRY ON</span>
                </div>
                <ArrowRight size={14} />
              </div>

              <div className="divide-y divide-zinc-100 border-t border-zinc-100">
                <button
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="w-full flex items-center justify-between py-4 text-xs tracking-widest uppercase hover:text-zinc-500 transition-colors"
                >
                  <span>Product Details</span>
                  <Plus size={14} className={`transition-transform ${detailsOpen ? "rotate-45" : ""}`} />
                </button>
                {detailsOpen && (
                  <div className="pb-4">
                    <ul className="space-y-2">
                      {product.details.map((detail) => (
                        <li key={detail} className="text-xs text-zinc-600 flex gap-2">
                          <span className="text-zinc-300">—</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setCareOpen(!careOpen)}
                  className="w-full flex items-center justify-between py-4 text-xs tracking-widest uppercase hover:text-zinc-500 transition-colors"
                >
                  <span>Care Instructions</span>
                  <Plus size={14} className={`transition-transform ${careOpen ? "rotate-45" : ""}`} />
                </button>
                {careOpen && (
                  <div className="pb-4">
                    <ul className="space-y-2">
                      {product.care.map((instruction) => (
                        <li key={instruction} className="text-xs text-zinc-600 flex gap-2">
                          <span className="text-zinc-300">—</span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSizeGuide(false)}
          />
          <div className="relative z-10 bg-white w-full md:w-auto md:min-w-96 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <h2 className="text-sm font-light tracking-wide">Size Guide — Girls 6–14 Yrs</h2>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-200">
                    {["AGE", "HEIGHT", "CHEST", "WAIST"].map((col) => (
                      <th key={col} className="py-3 text-left text-zinc-400 tracking-widest uppercase font-normal">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeGuideRows.map((row) => (
                    <tr key={row.age} className="border-b border-zinc-100">
                      <td className="py-3 font-medium">{row.age}</td>
                      <td className="py-3 text-zinc-600">{row.height}</td>
                      <td className="py-3 text-zinc-600">{row.chest}</td>
                      <td className="py-3 text-zinc-600">{row.waist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-5 border-t border-zinc-100">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
              >
                SHOP THIS SIZE
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="HOME" />
    </div>
  );
}
