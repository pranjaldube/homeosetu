"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categoryId?: string;
  name: string;
  icon?: React.ComponentType<any>;
  className?: string;
  variant?: "pill" | "ghost";
}

export const CategoryFilter = ({
  categoryId,
  name,
  icon: Icon,
  className,
  variant = "pill"
}: CategoryFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  
  const isSelected = currentCategoryId === categoryId || (!categoryId && !currentCategoryId);
  
  const onClick = () => {
    const url = qs.stringifyUrl({
      url: window.location.pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected && categoryId ? null : categoryId,
      }
    }, { skipNull: true, skipEmptyString: true });
    
    router.push(url);
  };
  
  if (variant === "ghost") {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center w-full gap-x-2 px-3 py-2 text-sm rounded-md transition-all duration-200",
          "hover:bg-slate-100 text-slate-600",
          isSelected && "bg-purple-50 text-purple-700 font-semibold shadow-sm",
          className
        )}
        type="button"
      >
        {Icon && <Icon size={18} className={cn(isSelected ? "text-purple-600" : "text-slate-500")} />}
        <span className="truncate">{name}</span>
      </button>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-300",
        "hover:border-purple-500 hover:text-purple-600 hover:shadow-md active:scale-95",
        isSelected && "border-purple-600 bg-purple-600 text-white font-medium shadow-purple-200 shadow-lg hover:text-white hover:border-purple-600",
        className
      )}
      type="button"
    >
      {Icon && <Icon size={18} />}
      <span className="whitespace-nowrap">{name}</span>
    </button>
  );
}; 