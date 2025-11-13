"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoyaltyStore } from "@/hooks/loyalty";

export default function UserLoyalty() {
  const pathname = usePathname();
  const { fetchLoyalty } = useLoyaltyStore();

  useEffect(() => {
    fetchLoyalty();
  }, [pathname]); // optional: re-run if you want to revalidate on route change

  return null; // this runs silently in background
}
