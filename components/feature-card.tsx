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
        "border border-border overflow-hidden group",
        "transition-shadow duration-200 hover:shadow-sm",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="mb-4">
          <Icon className="h-8 w-8 text-brand-primary" />
        </div>

        <h3 className="mb-2 text-lg font-heading font-bold text-foreground">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
