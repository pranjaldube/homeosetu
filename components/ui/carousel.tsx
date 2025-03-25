"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface CarouselProps {
  items: React.ReactNode[]
  autoSlide?: boolean
  autoSlideInterval?: number
  indicators?: boolean
  className?: string
}

export function Carousel({
  items,
  autoSlide = true,
  autoSlideInterval = 5000,
  indicators = true,
  className,
}: CarouselProps) {
  const [curr, setCurr] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurr((curr) => (curr === 0 ? items.length - 1 : curr - 1))
    setTimeout(() => setIsAnimating(false), 500) // Match duration with CSS transition
  }
  
  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurr((curr) => (curr === items.length - 1 ? 0 : curr + 1))
    setTimeout(() => setIsAnimating(false), 500) // Match duration with CSS transition
  }

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [autoSlideInterval, autoSlide, next])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0"
          >
            {item}
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 border-white/40 text-white shadow-lg transform transition-transform duration-300 hover:scale-110 pointer-events-auto"
          disabled={isAnimating}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 border-white/40 text-white shadow-lg transform transition-transform duration-300 hover:scale-110 pointer-events-auto"
          disabled={isAnimating}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
      
      {indicators && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-20">
          {items.map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300 shadow-md",
                curr === i 
                  ? "bg-white w-6" 
                  : "bg-white/50 hover:bg-white/80"
              )}
              onClick={() => {
                if (isAnimating) return
                setIsAnimating(true)
                setCurr(i)
                setTimeout(() => setIsAnimating(false), 500)
              }}
            />
          ))}
        </div>
      )}
      
      {/* Gradient overlay at bottom for better visibility of indicators */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  )
} 