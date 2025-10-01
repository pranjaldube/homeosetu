"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/cart";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseCardPublicProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  category: string;
  dollar: number;
  courseDuration: string;
  courseTimeLimit: number | null;
}

export const CourseCardPublic = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  category,
  dollar,
  courseDuration,
  courseTimeLimit,
}: CourseCardPublicProps) => {
  const { user } = useUser();
  // const [currency, setCurrency] = useState("INR")
  // const [actualPrice, setActualPrice] = useState(price)
  const currency =
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("preferred_currency="))
      ?.split("=")[1] || "INR";

  const actualPrice = !currency || currency === "INR" ? price : dollar;

  const href = user ? `/courses/${id}` : `/sign-in?redirectUrl=/courses/${id}`;

  // useEffect(() => {
  //   const cookie = document.cookie
  //     .split("; ")
  //     .find((c) => c.startsWith("preferred_currency="))
  //     ?.split("=")[1];

  //   const selected = cookie || "INR";
  //   setCurrency(selected)
  //   setActualPrice(selected === "INR" ? price : dollar);
  // }, [price, dollar]);

  const setItems = useCartStore((state) => state.setItems);

  const addToCart = async () => {
    // Optimistically update local store
    let isDuplicate = false;
    setItems((prev) => {
      if (prev.find((c) => c.id === id)) {
        isDuplicate = true;
        return prev;
      }
      return [
        ...prev,
        { id, title, price, usdPrice: dollar, courseTimeLimit, imageUrl },
      ];
    });

    if (isDuplicate) {
      toast.success("Already in cart");
      return;
    }

    toast.success("Added to cart");

    // If user is logged in, also persist to server cart
    try {
      if (user?.id) {
        await axios.post("/api/cart", { courseId: id });
      }
    } catch (error: any) {
      // Keep local cart; just notify if server persistence failed
      if (error?.response?.status === 401) {
        // not logged in/session expired; ignore silently
        return;
      }
      console.error("Failed to persist cart item:", error);
      toast.error("Could not sync cart to server. Will retry at checkout.");
    }
  };

  return (
    <div className="group hover:shadow-md transition-all duration-300 overflow-hidden border rounded-xl p-3 h-full bg-white hover:scale-[1.01]">
      <Link href={href} className="block">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            alt={title}
            src={imageUrl || "/placeholder-course.jpg"}
          />
          <div className="absolute top-2 right-2 bg-purple-900/90 text-white px-2 py-1 rounded text-xs font-semibold">
            {!price && !dollar
              ? "Free"
              : currency === "INR"
              ? `${formatPrice(actualPrice)} + GST`
              : formatPrice(actualPrice)}
          </div>
        </div>
        <div className="flex flex-col pt-3">
          <div className="text-lg font-medium group-hover:text-purple-700 transition line-clamp-2 min-h-[56px]">
            {title}
          </div>
          <p className="text-xs text-purple-600 bg-purple-100 inline-block px-2 py-1 rounded-full w-fit mt-2">
            {category}
          </p>
          <div className="text-sm text-gray-500 mt-2 px-2 py-1">
            {courseDuration ? `Time Duration: ${courseDuration}` : ""}
          </div>
          <div className="my-3 flex items-center gap-x-2 text-sm">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {(price || dollar) && <Button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addToCart();
        }}
        size="sm"
        className="mt-3 w-full px-4 py-2"
      >
        Add to cart
      </Button>}
    </div>
  );
};
