"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useCartStore } from "@/hooks/cart";
import { Navbar } from "@/app/(components)/navbar";
import { Footer } from "@/app/(components)/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const { user } = useUser();

  const currency =
    typeof document !== "undefined"
      ? document.cookie
          .split("; ")
          .find((c) => c.startsWith("preferred_currency="))
          ?.split("=")[1] || "INR"
      : "INR";

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const price = currency === "INR" ? item.price : item.usdPrice;
      return sum + (price || 0);
    }, 0);
    return { subtotal };
  }, [items, currency]);

  const removeItem = async (id: string) => {
    // Optimistic local update
    setItems((prev) => prev.filter((c) => c.id !== id));

    // Sync to server if logged in
    try {
      if (user?.id) {
        await axios.delete("/api/cart", { data: { courseId: id } });
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return;
      }
      console.error("Failed to remove cart item from server:", error);
      // Do not re-add locally to avoid jarring UX; user can refresh/sync at checkout
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {!items.length ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600 mb-4">Your cart is empty.</p>
              <Button asChild>
                <Link href="/explore">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const priceToShow = currency === "INR" ? item.price : item.usdPrice;
                return (
                  <Card key={item.id}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded overflow-hidden bg-gray-100">
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-200" />
                            )}
                          </div>
                          <div>
                          <h2 className="text-base sm:text-lg font-medium">{item.title}</h2>
                          <div className="text-sm text-gray-500 mt-1">
                            {item.courseTimeLimit
                              ? `Course Timelimit: ${item.courseTimeLimit} days`
                              : "Lifetime access"}
                          </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm text-gray-500">{currency}</div>
                            <div className="text-base font-semibold">
                              {currency === "INR"
                                ? `${formatPrice(priceToShow, currency)} + GST`
                                : formatPrice(priceToShow, currency)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Remove from cart"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-5 w-5 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        {currency === "INR"
                          ? `${formatPrice(totals.subtotal)} + GST`
                          : formatPrice(totals.subtotal)}
                      </span>
                    </div>
                    <Separator />
                    <div className="text-xs text-gray-500">GST calculated at checkout for INR purchases.</div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <Button asChild className="w-full">
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                    <Button variant="outline" onClick={() => clearCart()} className="whitespace-nowrap">
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {items.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button asChild size="lg" className="shadow-lg">
            <Link href="/checkout">Checkout</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;


