"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CarouselProps {
  items: React.ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  indicators?: boolean;
  className?: string;
  variant?: "dark" | "light";
}

export function TestimonialCarousel({
  items,
  autoSlide = true,
  autoSlideInterval = 5000,
  indicators = true,
  className,
  variant = "dark",
}: CarouselProps) {
  const [curr, setCurr] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3);
      else if (window.innerWidth >= 768) setSlidesPerView(2);
      else setSlidesPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Maximum index we can scroll to without showing empty space
  const maxIdx = Math.max(0, items.length - slidesPerView);
  const safeCurr = Math.min(curr, maxIdx);

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurr((curr) => (curr === 0 ? maxIdx : curr - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurr((curr) => (curr >= maxIdx ? 0 : curr + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlideInterval, autoSlide, next]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * (100 / slidesPerView)}%)` }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex-shrink-0 px-2",
              slidesPerView === 1
                ? "w-full"
                : slidesPerView === 2
                  ? "w-1/2"
                  : slidesPerView === 3
                    ? "w-1/3"
                    : "w-full",
            )}
          >
            {item}
          </div>
        ))}
      </div>

      {items.length > slidesPerView && (
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className={cn(
              "h-12 w-12 rounded-full backdrop-blur-sm shadow-lg transform transition-transform duration-300 hover:scale-110 pointer-events-auto",
              variant === "dark"
                ? "bg-white/30 hover:bg-white/50 border-white/40 text-white"
                : "bg-purple-900/10 hover:bg-purple-900/20 border-purple-900/20 text-purple-900",
            )}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className={cn(
              "h-12 w-12 rounded-full backdrop-blur-sm shadow-lg transform transition-transform duration-300 hover:scale-110 pointer-events-auto",
              variant === "dark"
                ? "bg-white/30 hover:bg-white/50 border-white/40 text-white"
                : "bg-purple-900/10 hover:bg-purple-900/20 border-purple-900/20 text-purple-900",
            )}
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      )}

      {indicators && items.length > slidesPerView && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-20">
          {items.slice(0, maxIdx + 1).map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300 shadow-md",
                curr === i
                  ? variant === "dark"
                    ? "bg-white w-6"
                    : "bg-purple-600 w-6"
                  : variant === "dark"
                    ? "bg-white/50 hover:bg-white/80"
                    : "bg-purple-200 hover:bg-purple-300",
              )}
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                setCurr(i);
                setTimeout(() => setIsAnimating(false), 500);
              }}
            />
          ))}
        </div>
      )}

      {/* Gradient overlay at bottom for better visibility of indicators (optional based on variant) */}
      {variant === "dark" && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      )}
    </div>
  );
}
