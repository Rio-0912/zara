"use client";

import Link from "next/link";
import { Home, Search, Heart, User, Trophy } from "lucide-react";

const tabs = [
  { label: "HOME", href: "/", Icon: Home },
  { label: "SEARCH", href: "/search", Icon: Search },
  { label: "REWARDS", href: "/rewards", Icon: Trophy },
  { label: "WISHLIST", href: "/wishlist", Icon: Heart },
  { label: "ACCOUNT", href: "/account", Icon: User },
];

export default function BottomNav({ active = "HOME" }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-100 flex md:hidden">
      {tabs.map(({ label, href, Icon }) => (
        <Link
          key={label}
          href={href}
          className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors ${
            active === label ? "text-black" : "text-zinc-400 hover:text-zinc-600"
          }`}
        >
          <Icon size={18} strokeWidth={active === label ? 2 : 1.5} />
          <span className="text-[9px] tracking-widest uppercase">{label}</span>
          {active === label && (
            <span className="absolute bottom-0 w-6 h-0.5 bg-black rounded-full" />
          )}
        </Link>
      ))}
    </nav>
  );
}
