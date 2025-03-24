"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categoryId?: string;
  name: string;
  icon?: IconType;
  className?: string;
}

export const CategoryFilter = ({
  categoryId,
  name,
  icon: Icon,
  className
}: CategoryFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  
  const isSelected = currentCategoryId === categoryId;
  
  const onClick = () => {
    const url = qs.stringifyUrl({
      url: window.location.pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : categoryId,
      }
    }, { skipNull: true, skipEmptyString: true });
    
    router.push(url);
  };
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 px-4 py-3 rounded-full border border-gray-200 hover:border-purple-700 transition-colors",
        isSelected && "border-purple-700 bg-purple-50 text-purple-800 font-medium",
        className
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <span>{name}</span>
    </button>
  );
}; 