"use client";

import { Category } from "@prisma/client";
import { CategoryFilter } from "@/components/category-filter";
import { FcBinoculars } from "react-icons/fc";
import { FcGlobe } from "react-icons/fc";
import { FcGraduationCap } from "react-icons/fc";
import { FcMindMap } from "react-icons/fc";
import { FcReading } from "react-icons/fc";
import { FcBiotech } from "react-icons/fc";
import { FcList } from "react-icons/fc";
import { IconType } from "react-icons";

interface CategoryFiltersProps {
  categories: Category[];
}

// You'll need to map actual category names to icons
const iconMap: Record<string, IconType> = {
  "Homeopathy": FcBiotech,
  "Clinical": FcMindMap,
  "Academic": FcGraduationCap,
  "Literature": FcReading,
  "International": FcGlobe,
  "Observation": FcBinoculars,
  "All": FcList,
  // Add more mappings as needed 
};

export const CategoryFilters = ({
  categories
}: CategoryFiltersProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2">
      <CategoryFilter
        name="All Courses"
        icon={iconMap["All"]}
      />
      {categories.map((category) => (
        <CategoryFilter
          key={category.id}
          categoryId={category.id}
          name={category.name}
          icon={iconMap[category.name] || FcList}
        />
      ))}
    </div>
  );
};
 