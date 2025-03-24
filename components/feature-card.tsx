import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  className?: string
}

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
}: FeatureCardProps) => {
  return (
    <Card 
      className={cn(
        "border-none overflow-hidden group relative", 
        "transition-all duration-300 shadow-md hover:shadow-xl",
        "hover:translate-y-[-5px]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 bg-purple-100 p-4 rounded-full transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-200">
            <Icon className="h-10 w-10 text-purple-800" />
          </div>
          
          <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-purple-900 transition-colors duration-300">
            {title}
          </h3>
          
          <div className="w-16 h-1 bg-purple-200 mb-4 group-hover:bg-purple-400 transition-colors duration-300" />
          
          <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 