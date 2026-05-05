"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { womanProducts } from "@/lib/data";

export default function WishlistPage() {
  const wishlistItems = womanProducts.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 md:px-8 py-8 max-w-screen-2xl mx-auto w-full">
        <h1 className="text-sm font-medium tracking-widest uppercase mb-8">Wishlist ({wishlistItems.length})</h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-zinc-400 text-sm tracking-wide uppercase">Your wishlist is empty</p>
            <Link href="/" className="mt-4 inline-block text-xs tracking-widest uppercase underline hover:text-zinc-500">
              Start Shopping
            </Link>
          </div>
        )}
      </main>
      <BottomNav active="WISHLIST" />
    </div>
  );
}
