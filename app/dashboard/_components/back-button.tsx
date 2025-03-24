"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label?: string;
  href?: string;
}

export const BackButton = ({ 
  label = "Back", 
  href 
}: BackButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="flex items-center text-sm text-slate-600 gap-x-1 mb-4 hover:text-slate-900"
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}; 