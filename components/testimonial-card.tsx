import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  content: string
  author: string
  role: string
  avatarSrc?: string
  className?: string
}

export const TestimonialCard = ({
  content,
  author,
  role,
  avatarSrc,
  className,
}: TestimonialCardProps) => {
  return (
    <Card 
      className={cn(
        "border-none relative overflow-hidden group", 
        "transition-all duration-300 hover:shadow-lg",
        "bg-gradient-to-br from-white to-purple-50/50",
        className
      )}
    >
      {/* Decorative quotation mark */}
      <div className="absolute top-6 right-6 text-8xl font-serif text-purple-200 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
        "
      </div>
      
      <CardContent className="p-8 relative z-10">
        {/* Rating Stars */}
        <div className="mb-6 flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="h-5 w-5 text-yellow-500 transform transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        {/* Content */}
        <p className="mb-8 text-gray-600 italic text-lg leading-relaxed relative">
          "{content}"
        </p>
        
        {/* Divider */}
        <div className="w-16 h-0.5 bg-purple-200 mb-6 group-hover:bg-purple-400 transition-colors duration-300" />
        
        {/* Author Info */}
        <div className="flex items-center">
          {avatarSrc ? (
            <div className="mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-purple-200 group-hover:border-purple-400 transition-colors duration-300">
              <Image
                src={avatarSrc}
                alt={author}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="mr-4 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-200 group-hover:bg-purple-200 group-hover:border-purple-400 transition-colors duration-300">
              <span className="text-purple-800 font-bold text-lg">
                {author.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-bold text-gray-800 group-hover:text-purple-900 transition-colors duration-300">{author}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 