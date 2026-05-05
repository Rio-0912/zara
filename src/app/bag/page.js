"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";
import { X, Plus, Minus, Heart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

const cartToRecs = {
  'linen-trousers': [
    { id:'rec-01', name:'Linen Blend Oversized Blazer', price:5990, note:'Completes the linen look', image: '/models/female/image copy.png' },
    { id:'rec-02', name:'Leather Flatform Sneakers',    price:4490, note:'Casual cool underfoot', image: '/models/female/image copy 4.png' },
    { id:'rec-03', name:'Structured Mini Tote Bag',     price:3290, note:'Neutral bag, any outfit', image: '/models/female/image copy 5.png' },
    { id:'rec-04', name:'Wide Leather Waist Belt',      price:1990, note:'Defines the silhouette', image: '/models/female/image copy 6.png' },
  ]
};

function BagContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applyRewards = searchParams.get('applyRewards') === 'true';

  const { cartItems, removeFromCart, updateQty, addToCart, isLoaded } = useCart();
  const [recommendations, setRecommendations] = useState([]);
  const [inBagRecs, setInBagRecs] = useState({});
  const [wishlistedRecs, setWishlistedRecs] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showRewards, setShowRewards] = useState(applyRewards);
  
  const [sizeSelectorOpen, setSizeSelectorOpen] = useState(false);
  const [selectedRecForSize, setSelectedRecForSize] = useState(null);

  useEffect(() => {
    if (cartItems.length > 0) {
      const firstId = cartItems[0].id;
      // Provide some fallback recs if none map exactly
      setRecommendations(cartToRecs[firstId] || cartToRecs['linen-trousers'] || []);
    } else {
      setRecommendations([]);
    }
  }, [cartItems]);

  const handleWishlist = (id) => {
    setWishlistedRecs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openSizeSelector = (rec) => {
    setSelectedRecForSize(rec);
    setSizeSelectorOpen(true);
  };

  const confirmQuickAdd = (size) => {
    if (!selectedRecForSize) return;
    addToCart(selectedRecForSize, size, "DEFAULT");
    setInBagRecs(prev => ({ ...prev, [selectedRecForSize.id]: true }));
    setSizeSelectorOpen(false);
    setToastMessage("Added to your bag");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleAddAllToBag = () => {
    const newInBag = { ...inBagRecs };
    recommendations.forEach(rec => {
      newInBag[rec.id] = true;
      addToCart(rec, "M", "DEFAULT");
    });
    setInBagRecs(newInBag);
    setToastMessage("Items added to your bag");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
  const total = Math.max(0, subtotal - (showRewards ? 50 : 0));

  const getStylistQuote = () => {
    if (cartItems.length === 0) return "";
    const name = cartItems[0].name.toLowerCase();
    if (name.includes('trouser') || name.includes('pant')) return "Wide-leg styles work best when kept minimal on top...";
    if (name.includes('dress')) return "Let the dress do the work — keep accessories architectural and minimal...";
    if (name.includes('top') || name.includes('shirt')) return "A great top needs an equally considered bottom — proportion is everything...";
    return "Build from one hero piece and let everything else support it.";
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading cart...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 pb-20 w-full">
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 text-xs z-50">
            {toastMessage}
          </div>
        )}

        <div className="px-4 py-6 md:px-8 max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
            <h1 className="text-sm font-medium tracking-widest uppercase">My Bag <span className="text-zinc-400 font-normal">({cartItems.length} items)</span></h1>
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_360px] gap-10">
            <div>
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-zinc-500 tracking-wide mb-6">Your bag is empty.</p>
                  <Link href="/woman" className="border border-black px-6 py-3 text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
                    CONTINUE SHOPPING
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 border-b border-zinc-100 pb-6">
                      <div className="relative w-24 h-32 bg-[#F5F5F5] shrink-0 overflow-hidden">
                        <img src={item.image || "/models/female/image copy.png"} alt={item.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h2 className="text-[11px] tracking-widest uppercase font-medium">{item.name}</h2>
                            <button 
                              onClick={() => removeFromCart(item.id, item.size, item.color)} 
                              className="text-zinc-400 hover:text-black transition-colors"
                            >
                              <X size={16}/>
                            </button>
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">{item.color} | {item.size}</p>
                          <p className="text-xs mt-2 font-medium">₹{(item.price || 0).toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-zinc-300 w-24 h-8">
                            <button onClick={() => updateQty(item.id, item.size, item.color, item.qty - 1)} className="flex-1 flex items-center justify-center hover:bg-zinc-50"><Minus size={12}/></button>
                            <span className="text-xs font-medium">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.size, item.color, item.qty + 1)} className="flex-1 flex items-center justify-center hover:bg-zinc-50"><Plus size={12}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-xs tracking-wide">
                  <span className="text-zinc-500 uppercase">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs tracking-wide text-green-700">
                  <span className="uppercase">Delivery</span>
                  <span>FREE</span>
                </div>
                
                {showRewards && cartItems.length > 0 && (
                  <div className="flex justify-between items-center bg-[#F0FFF0] p-3 border border-green-100">
                    <span className="text-[13px] font-medium text-[#2E7D32]">–₹50 Rewards Applied ✓</span>
                    <button onClick={() => setShowRewards(false)} className="text-[11px] font-normal underline text-[#2E7D32]">REMOVE</button>
                  </div>
                )}

                <div className="pt-4 border-t border-black flex justify-between font-medium">
                  <span className="text-xs tracking-widest uppercase">Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                disabled={cartItems.length === 0}
                className={`w-full py-4 text-xs tracking-widest uppercase mt-6 transition-colors ${
                  cartItems.length > 0 ? "bg-black text-white hover:bg-zinc-800" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                }`}
              >
                PROCEED TO CHECKOUT
              </button>
              <div className="text-center mt-4">
                <Link href="/" className="text-[10px] tracking-widest uppercase text-zinc-400 underline hover:text-black">
                  or Continue Shopping →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {recommendations.length > 0 && cartItems.length > 0 && (
          <div className="mt-12 bg-zinc-50 py-10 px-4 md:px-8">
            <div className="max-w-screen-xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">ZS</div>
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium">STYLED FOR YOU</p>
                  <p className="text-[10px] text-zinc-500 tracking-wide">By Zara Style Team</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 border border-zinc-200 mb-6">
                <img src={cartItems[0].image || "/models/female/image copy.png"} className="w-5 h-5 rounded-full object-cover" alt="" />
                <span className="text-[10px] tracking-wide text-zinc-600">
                  {cartItems.length > 1 ? `Styled to match your bag (${cartItems.length} items)` : `Pairs with your ${cartItems[0].name.split(' ')[0]}`}
                </span>
              </div>

              <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {recommendations.map(rec => (
                  <div key={rec.id} className="shrink-0 w-48 snap-start flex flex-col group">
                    <div className="relative w-full aspect-[3/4] bg-[#F5F5F5] overflow-hidden mb-3">
                      <img src={rec.image} alt={rec.name} className="w-full h-full object-cover object-top" />
                      <div className="absolute top-2 left-2 bg-white px-1.5 py-0.5 text-[8px] font-medium tracking-widest uppercase">
                        STYLIST PICK
                      </div>
                      <button 
                        onClick={() => handleWishlist(rec.id)}
                        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center hover:scale-110 transition-transform bg-white/50 backdrop-blur-sm rounded-full"
                      >
                        <Heart size={14} className={wishlistedRecs[rec.id] ? "fill-black text-black scale-110" : "text-black"} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-[10px] uppercase tracking-wide font-medium leading-tight mb-1">{rec.name}</h3>
                      <p className="text-[10px] text-zinc-500 mb-2">₹{(rec.price || 0).toLocaleString()}</p>
                      <p className="text-[9px] text-zinc-400 italic mb-3 flex items-center gap-1">
                        <span className="text-[8px]">☆</span> {rec.note}
                      </p>
                      
                      <div className="mt-auto pt-2 border-t border-zinc-100">
                        {inBagRecs[rec.id] ? (
                          <div className="flex items-center gap-1.5 text-[#2E7D32]">
                            <Check size={10} />
                            <span className="text-[11px] font-medium tracking-widest uppercase">IN BAG</span>
                          </div>
                        ) : (
                          <button onClick={() => openSizeSelector(rec)} className="text-[10px] tracking-widest uppercase font-medium border-b border-black pb-0.5 inline-block hover:text-zinc-600 transition-colors">
                            QUICK ADD
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="shrink-0 w-64 snap-start border border-zinc-200 bg-white p-6 flex flex-col justify-center">
                  <p className="text-[10px] tracking-widest uppercase text-zinc-400 mb-4">Stylist Note</p>
                  <p className="text-sm font-serif italic leading-relaxed text-zinc-700 mb-6">
                    "{getStylistQuote()}"
                  </p>
                  <p className="text-[9px] tracking-widest uppercase font-medium text-right">— Zara Style Team</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  onClick={handleAddAllToBag}
                  className="flex-1 bg-white border border-black text-black py-4 text-xs tracking-widest uppercase hover:bg-zinc-50 transition-colors"
                >
                  ADD ALL TO BAG
                </button>
                <button 
                  onClick={() => router.push('/woman?filter=full-look')}
                  className="flex-1 bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
                >
                  SHOP FULL LOOK
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {sizeSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSizeSelectorOpen(false)} />
          <div className="relative w-full bg-white px-6 pb-8 pt-6 rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm tracking-widest uppercase font-medium">Select Size</h3>
              <button onClick={() => setSizeSelectorOpen(false)}><X size={20}/></button>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size} 
                  onClick={() => confirmQuickAdd(size)}
                  className="border border-zinc-200 py-3 text-xs tracking-widest hover:border-black transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav active="" />
    </div>
  );
}

export default function BagPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BagContent />
    </Suspense>
  );
}
