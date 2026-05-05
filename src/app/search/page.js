"use client";

import { useRouter } from "next/navigation";
import SearchOverlay from "@/components/SearchOverlay";

export default function SearchPage() {
  const router = useRouter();

  return (
    <SearchOverlay onClose={() => router.back()} />
  );
}
