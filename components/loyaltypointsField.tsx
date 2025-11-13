"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useLoyaltyStore } from "@/hooks/loyalty";

export default function LoyaltyPointsField() {
  const { points, fetchLoyalty, loading } = useLoyaltyStore();

  useEffect(() => {
    if (points === 0) {
      fetchLoyalty();
    }
  }, [points, fetchLoyalty]);

  return (
    <div className="flex flex-col gap-2 sm:col-span-2">
      <label
        htmlFor="loyaltyPoints"
        className="text-sm font-medium text-gray-600"
      >
        Loyalty Points
      </label>
      <Input
        id="loyaltyPoints"
        name="loyaltyPoints"
        value={(!points) ? "Loading..." : points}
        disabled
        className="text-gray-800 bg-gray-50"
      />
      <p className="text-xs text-gray-500 mt-1">
        Earn points by completing activities like bookings, reviews, and referrals.
        You can redeem your points to get exclusive discounts and offers.
      </p>
    </div>
  );
}
