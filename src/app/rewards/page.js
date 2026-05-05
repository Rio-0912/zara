"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, Gift, MessageSquare, UserPlus } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

export default function RewardsScreen() {
  const router = useRouter();
  const [points, setPoints] = useState(0);
  const targetPoints = 2450;
  const [tier] = useState("SILVER");
  const [nextTier] = useState({ name: "GOLD", required: 3000 });
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setPoints(Math.floor(easeOut * targetPoints));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);

    setTimeout(() => {
      setProgressWidth((targetPoints / nextTier.required) * 100);
    }, 100); // slight delay for transition
  }, [targetPoints, nextTier.required]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="flex items-center justify-between px-4 py-4 border-b border-zinc-100 bg-white sticky top-0 z-10">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <span className="text-xs font-medium tracking-[0.2em] uppercase">Rewards</span>
        <button className="w-8 h-8 flex items-center justify-center">
          <Info size={18} strokeWidth={1.5} />
        </button>
      </header>

      <main className="flex-1 pb-20">
        <div className="p-4">
          <div className="bg-black text-white p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[8px] font-bold">Z</span>
              <span className="text-[10px] tracking-[0.2em] font-medium uppercase">Zara Black</span>
            </div>
            
            <div className="mb-8">
              <h1 className="text-4xl font-semibold tracking-tight mb-1">{points.toLocaleString()}</h1>
              <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase">Style Points</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-[10px] tracking-widest uppercase mb-2">
                <span>{tier}</span>
                <span className="text-zinc-500">{nextTier.name}</span>
              </div>
              <div className="h-[1px] bg-zinc-800 w-full relative">
                <div 
                  className="absolute left-0 top-0 h-full bg-white transition-all duration-1000 ease-out" 
                  style={{ width: `${progressWidth}%` }}
                />
              </div>
            </div>
            
            <p className="text-[10px] italic text-zinc-400 font-serif mb-6">
              Only {nextTier.required - targetPoints} points until {nextTier.name} tier
            </p>

            <div className="flex flex-col gap-2">
              <div className="border border-white/20 px-3 py-1.5 inline-flex self-start text-[9px] tracking-widest uppercase">Free Shipping</div>
              <div className="border border-white/20 px-3 py-1.5 inline-flex self-start text-[9px] tracking-widest uppercase">Early Access</div>
              <div className="border border-white/20 px-3 py-1.5 inline-flex self-start text-[9px] tracking-widest uppercase">Free Returns</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 border-y border-zinc-100 py-4 mb-6">
          <div className="text-center px-2">
            <p className="text-[9px] text-zinc-400 tracking-widest uppercase mb-1">Available</p>
            <p className="text-sm font-medium">{targetPoints.toLocaleString()}</p>
          </div>
          <div className="text-center px-2 border-l border-zinc-100">
            <p className="text-[9px] text-zinc-400 tracking-widest uppercase mb-1">Pending</p>
            <p className="text-sm font-medium">380</p>
          </div>
          <div className="text-center px-2 border-l border-zinc-100">
            <p className="text-[9px] text-zinc-400 tracking-widest uppercase mb-1">Lifetime</p>
            <p className="text-sm font-medium">5,200</p>
          </div>
        </div>

        <div className="px-4 mb-8">
          <div className="bg-zinc-50 p-5">
            <div className="flex items-start gap-3 mb-4">
              <Gift size={16} className="mt-0.5" />
              <div>
                <p className="text-xs font-medium tracking-widest uppercase mb-2">How to Redeem</p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Every 500 Style Points can be redeemed for a ₹50 discount on your next purchase at checkout.
                </p>
              </div>
            </div>
            <button 
              onClick={() => router.push('/bag?applyRewards=true')}
              className="text-xs font-medium tracking-widest uppercase border-b border-black pb-0.5 ml-7 hover:text-zinc-600 transition-colors"
            >
              REDEEM AT CHECKOUT →
            </button>
          </div>
        </div>

        <div className="px-4 mb-8">
          <h2 className="text-[10px] tracking-widest uppercase text-zinc-500 mb-4">How to Earn</h2>
          {/* TODO: REPLACE WITH REAL API */}
          {/* GET /api/rewards/personalised-actions?userId= */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center">
                  <Gift size={16} className="text-zinc-600" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-widest uppercase">Shop Any Order</p>
                  <p className="text-xs text-zinc-500 mt-0.5">₹100 = 10 Points</p>
                </div>
              </div>
              <span className="text-xs font-medium">+10 Pts</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center">
                  <MessageSquare size={16} className="text-zinc-600" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-widest uppercase">Write a Review</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Per verified review</p>
                </div>
              </div>
              <span className="text-xs font-medium">+50 Pts</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center">
                  <UserPlus size={16} className="text-zinc-600" />
                </div>
                <div>
                  <p className="text-[10px] font-medium tracking-widest uppercase">Refer a Friend</p>
                  <p className="text-xs text-zinc-500 mt-0.5">On their first purchase</p>
                </div>
              </div>
              <span className="text-xs font-medium">+200 Pts</span>
            </div>
          </div>
        </div>

        <div className="px-4 mb-8">
          <h2 className="text-[10px] tracking-widest uppercase text-zinc-500 mb-4">Membership Tiers</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            <div className="shrink-0 w-64 border-[3px] border-black p-5 snap-center">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium tracking-widest uppercase">Silver</span>
                <span className="bg-black text-white text-[8px] font-bold tracking-widest uppercase px-2 py-1">Current</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs text-zinc-600"><span className="text-black">✓</span> Free standard delivery</li>
                <li className="flex items-center gap-2 text-xs text-zinc-600"><span className="text-black">✓</span> Birthday gift</li>
              </ul>
            </div>
            
            <div className="shrink-0 w-64 border border-zinc-200 p-5 snap-center opacity-50">
              <div className="mb-4">
                <span className="text-xs font-medium tracking-widest uppercase text-zinc-400">Gold</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-xs text-zinc-600"><span className="text-zinc-400">✓</span> Free express delivery</li>
                <li className="flex items-center gap-2 text-xs text-zinc-600"><span className="text-zinc-400">✓</span> Exclusive events</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <h2 className="text-[10px] tracking-widest uppercase text-zinc-500 mb-4">Recent Activity</h2>
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase mb-0.5">Order #110293847</p>
                <p className="text-xs text-zinc-400">Oct 12, 2023</p>
              </div>
              <span className="text-xs font-medium">+420</span>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase mb-0.5">Product Review</p>
                <p className="text-xs text-zinc-400">Oct 05, 2023</p>
              </div>
              <span className="text-xs font-medium">+50</span>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase mb-0.5">Redeemed Discount</p>
                <p className="text-xs text-zinc-400">Sep 28, 2023</p>
              </div>
              <span className="text-xs font-medium text-rose-600">-500</span>
            </div>
          </div>
        </div>
      </main>

      <BottomNav active="REWARDS" />
    </div>
  );
}
