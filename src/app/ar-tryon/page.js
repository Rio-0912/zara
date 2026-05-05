"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Info, Camera, RefreshCw, ShoppingBag } from "lucide-react";
import Product3DModel from "@/components/Product3DModel";

function ARTryOnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId") || "linen-trousers";
  const productName = searchParams.get("productName") || "LINEN BLEND WIDE LEG TROUSERS";
  const initialColor = searchParams.get("currentColor") || "ECRU";
  const initialSize = searchParams.get("currentSize") || "M";
  const productImage = searchParams.get("productImage") || "/models/female/image copy 2.png";

  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [showTips, setShowTips] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flash, setFlash] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const colorFilters = {
    "ECRU": "sepia(0.2) saturate(0.8)",
    "BLACK": "brightness(0) saturate(0)",
    "NAVY": "sepia(1) saturate(2) hue-rotate(190deg)",
    "OLIVE": "sepia(1) saturate(1.2) hue-rotate(60deg)",
    "RUST": "sepia(1) saturate(2) hue-rotate(330deg)",
  };

  const colors = [
    { name: "ECRU", hex: "#F5F5DC" },
    { name: "BLACK", hex: "#000000" },
    { name: "NAVY", hex: "#000080" },
    { name: "OLIVE", hex: "#556B2F" },
    { name: "RUST", hex: "#8B4513" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  // TODO: REPLACE WITH REAL API
  // const AR_API = process.env.REACT_APP_AR_ENDPOINT
  // Replace the CSS filter simulation with:
  // - MediaPipe Selfie Segmentation for body detection
  // - TensorFlow.js PoseNet for body keypoint mapping
  // - Canvas API for real garment overlay rendering

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSavePhoto = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
    setToastMessage("Photo saved to your gallery");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleAddToBag = () => {
    setToastMessage(`Added ${productName} to bag`);
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-[200]">
      {/* Camera Feed Area */}
      <div className="relative flex-1 bg-[#1A1A1A] overflow-hidden">
        {/* Header overlays */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center text-white">
            <X size={24} strokeWidth={1.5} />
          </button>
          <span className="text-white text-xs tracking-[0.2em] uppercase font-medium">AR Try-On</span>
          <button onClick={() => setShowTips(true)} className="w-10 h-10 flex items-center justify-center text-white">
            <Info size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Silhouette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center transition-transform duration-300"
          style={{ transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)' }}
        >
          {/* Dashed silhouette outline */}
          <div className="w-64 h-[500px] border-2 border-dashed border-white/30 rounded-[100px] mt-10 relative">
             <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-dashed border-white/30"></div>
          </div>
          
          {/* 3D Garment overlay - Larger and Interactive */}
          <div 
            className="absolute inset-0 z-10 pointer-events-auto"
          >
            <Product3DModel 
              modelPath="/dress.glb" 
              className="w-full h-full bg-transparent" 
            />
          </div>
        </div>

        {/* Camera controls */}
        <div className="absolute bottom-0 w-full p-6 flex flex-col items-center z-20 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white/80 text-[11px] tracking-widest uppercase mb-1">Point camera at yourself</p>
          <p className="text-white text-[10px] tracking-[0.2em] uppercase mb-6 opacity-70">Stand 1-2 metres away</p>
          
          <div className="flex items-center justify-between w-full max-w-sm px-4">
            <button 
              onClick={handleSavePhoto}
              className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <Camera size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={handleFlip}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              <RefreshCw size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Flash overlay */}
        <div 
          className="absolute inset-0 bg-white pointer-events-none z-30 transition-opacity duration-300"
          style={{ opacity: flash ? 0.8 : 0 }}
        />
        
        {/* Live indicator */}
        <div className="absolute top-16 right-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full z-20 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] text-white tracking-widest font-medium uppercase">Live</span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="bg-white z-40 border-t border-zinc-100 flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b border-zinc-100">
          <img src={productImage} alt="Product" className="w-14 h-18 object-cover bg-zinc-100" />
          <div className="flex-1">
            <h2 className="text-[11px] font-medium tracking-wide uppercase mb-1 line-clamp-1">{productName}</h2>
            <p className="text-[10px] text-zinc-500 tracking-wider uppercase">{selectedColor} · SIZE {selectedSize}</p>
          </div>
          <button className="text-[10px] tracking-widest font-medium uppercase border-b border-black pb-0.5">Change</button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto max-h-[40vh]">
          <div className="mb-6">
            <p className="text-[10px] font-medium tracking-widest uppercase mb-3 text-zinc-800">Colour</p>
            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-8 h-8 rounded-full transition-all flex items-center justify-center ${
                    selectedColor === c.name ? "border-[1.5px] border-black p-0.5" : "border border-zinc-300"
                  }`}
                >
                  <span 
                    className="w-full h-full rounded-full border border-black/10" 
                    style={{ backgroundColor: c.hex }} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[10px] font-medium tracking-widest uppercase mb-3 text-zinc-800">Size</p>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`flex-1 py-3 text-[10px] tracking-widest transition-colors ${
                    selectedSize === s ? "bg-black text-white border border-black" : "border border-zinc-200 text-zinc-800"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleAddToBag}
            className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase mt-2 hover:bg-zinc-800 transition-colors flex justify-center items-center gap-2"
          >
            <ShoppingBag size={14} /> Add to Bag
          </button>
        </div>
      </div>

      {/* Tips Modal */}
      {showTips && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTips(false)} />
          <div className="relative bg-white w-[85%] max-w-sm p-6 text-center shadow-2xl">
            <h3 className="text-sm font-medium tracking-widest uppercase mb-4">Try-On Tips</h3>
            <ul className="text-xs text-zinc-600 text-left space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-black font-medium mt-0.5">1.</span>
                <span>Stand back 1 to 2 metres so your full body is in the frame.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-medium mt-0.5">2.</span>
                <span>Ensure good lighting in the room for better garment overlay tracking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-medium mt-0.5">3.</span>
                <span>Wear fitted clothing for the most accurate fit visualization.</span>
              </li>
            </ul>
            <button 
              onClick={() => setShowTips(false)}
              className="w-full bg-black text-white py-3 text-[10px] tracking-widest uppercase"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-3 text-xs tracking-wide z-[60] shadow-xl animate-in slide-in-from-bottom-5 whitespace-nowrap">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default function ARTryOnScreen() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">Loading AR...</div>}>
      <ARTryOnContent />
    </Suspense>
  );
}
