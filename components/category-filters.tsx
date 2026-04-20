"use client";

import { Category } from "@prisma/client";
import { 
  LayoutGrid, 
  Microscope, 
  Stethoscope, 
  GraduationCap, 
  BookOpen, 
  Globe, 
  Search,
  ChevronDown,
  Filter
} from "lucide-react";
import { IconType as ReactIconType } from "react-icons";
import { LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryFilter } from "@/components/category-filter";
import { useSearchParams } from "next/navigation";

interface CategoryFiltersProps {
  categories: Category[];
  layout?: "horizontal" | "dropdown";
}

type IconType = LucideIcon | ReactIconType;

const iconMap: Record<string, IconType> = {
  "Homeopathy": Microscope,
  "Clinical": Stethoscope,
  "Academic": GraduationCap,
  "Literature": BookOpen,
  "International": Globe,
  "Observation": Search,
  "All": LayoutGrid,
};

export const CategoryFilters = ({
  categories,
  layout = "horizontal"
}: CategoryFiltersProps) => {
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  
  const selectedCategory = categories.find(c => c.id === currentCategoryId);
  const currentCategoryName = selectedCategory ? selectedCategory.name : "All Categories";
  const CurrentIcon = selectedCategory ? (iconMap[selectedCategory.name] || LayoutGrid) : LayoutGrid;

  if (layout === "dropdown") {
    return (
      <div className="flex items-center gap-x-3">
        <div className="p-2 bg-brand-primary-surface rounded-lg text-brand-primary">
          <Filter size={20} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full md:w-[250px] justify-between bg-white/50 backdrop-blur-sm border-slate-200 hover:border-brand-primary hover:bg-white transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center gap-x-2">
                <CurrentIcon size={18} className="text-brand-primary" />
                <span className="font-medium text-slate-700">{currentCategoryName}</span>
              </div>
              <ChevronDown size={16} className="text-slate-400 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[250px] p-2 bg-white/90 backdrop-blur-md border-slate-200/60 shadow-2xl rounded-xl animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
            <CategoryFilter
              name="All Categories"
              icon={LayoutGrid}
              variant="ghost"
              className="mb-1"
            />
            {categories.map((category) => (
              <CategoryFilter
                key={category.id}
                categoryId={category.id}
                name={category.name}
                icon={iconMap[category.name] || LayoutGrid}
                variant="ghost"
              />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar">
      <CategoryFilter
        name="All Courses"
        icon={LayoutGrid}
      />
      {categories.map((category) => (
        <CategoryFilter
          key={category.id}
          categoryId={category.id}
          name={category.name}
          icon={iconMap[category.name] || LayoutGrid}
        />
      ))}
    </div>
  );
};
 