import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  avatarSrc?: string;
  className?: string;
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
        "border border-border overflow-hidden flex flex-col h-full",
        "transition-shadow duration-200 hover:shadow-sm",
        className,
      )}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="mb-4 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="h-4 w-4 text-brand-secondary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="mb-6 text-muted-foreground italic leading-relaxed line-clamp-4">
            &quot;{content}&quot;
          </p>
        </div>

        <div className="flex items-center mt-auto pt-4 border-t border-border">
          {avatarSrc ? (
            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={avatarSrc}
                alt={author}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="mr-3 h-10 w-10 rounded-full bg-brand-primary-surface flex items-center justify-center">
              <span className="text-brand-primary font-bold text-sm">
                {author.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <p className="font-medium text-foreground text-sm leading-tight">
              {author}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
