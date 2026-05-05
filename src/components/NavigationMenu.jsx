"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, Trophy } from "lucide-react";

const navLinks = [
  { label: 'WOMAN',        path: '/woman' },
  { label: 'MAN',          path: '/man' },
  { label: 'KIDS',         path: '/kids' },
  { label: 'PERFUMES',     path: '/perfumes' },
  { label: 'REWARDS',      path: '/rewards' },
  { label: 'EDITORIAL HUB',path: '/editorial' },
];

export default function NavigationMenu({ onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigate = (path) => {
    if (pathname === path) {
      handleClose();
      return;
    }
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      router.push(path);
    }, 200);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      <div className="relative z-10 flex h-full">
        <div
          className={`w-72 bg-white h-full flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
            !mounted || isClosing ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
            <span className="text-sm font-medium letter-wider tracking-widest uppercase">Zara</span>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="flex-1 py-4 flex flex-col">
            {navLinks.map(({ label, path }) => {
              const isActive = pathname === path;
              return (
                <button
                  key={label}
                  onClick={() => handleNavigate(path)}
                  className={`w-full flex items-center px-6 py-4 text-sm font-medium tracking-widest uppercase transition-colors hover:bg-zinc-50 ${
                    isActive ? "text-black border-l-[3px] border-black" : "text-zinc-800 border-l-[3px] border-transparent"
                  }`}
                >
                  {label === 'REWARDS' && <Trophy size={20} className="mr-3" />}
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="px-6 py-4 border-t border-zinc-100 flex items-center gap-4 text-xs text-zinc-500">
            <span className="uppercase tracking-wider cursor-pointer hover:text-black transition-colors">India ▼</span>
            <span className="uppercase tracking-wider cursor-pointer hover:text-black transition-colors">EN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
