"use client";

import { Category } from "@prisma/client";
import { SearchInput } from "@/components/search-input";
import { Categories } from "./categories";
import { CoursesList } from "@/components/courses-list";

interface SearchContentProps {
  categories: Category[];
  courses: any[];
}

export const SearchContent = ({
  categories,
  courses
}: SearchContentProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Browse Courses</h1>
      
      <div className="md:hidden">
        <SearchInput />
      </div>
      
      <Categories items={categories} />
      
      <CoursesList items={courses} />
    </div>
  );
} 