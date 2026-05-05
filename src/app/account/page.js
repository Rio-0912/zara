"use client";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-16 md:pb-0 px-4 py-8 max-w-screen-2xl mx-auto w-full">
        <h1 className="text-2xl font-light tracking-widest uppercase mb-8">My Account</h1>
        <div className="grid gap-6">
          <div className="p-6 border border-zinc-200">
            <h2 className="text-sm tracking-widest uppercase mb-2">Personal Details</h2>
            <p className="text-sm text-zinc-500">Manage your profile and preferences.</p>
          </div>
          <div className="p-6 border border-zinc-200">
            <h2 className="text-sm tracking-widest uppercase mb-2">Orders</h2>
            <p className="text-sm text-zinc-500">Track and manage your recent orders.</p>
          </div>
          <div className="p-6 border border-zinc-200">
            <h2 className="text-sm tracking-widest uppercase mb-2">Settings</h2>
            <p className="text-sm text-zinc-500">Update your account settings.</p>
          </div>
        </div>
      </main>
      <BottomNav active="ACCOUNT" />
    </div>
  );
}
