import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { BackButton } from "@/app/dashboard/_components/back-button";

import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <BackButton href="/dashboard" label="Back to dashboard" />
      
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Browse Courses</h1>
        
        <div className="md:hidden">
          <SearchInput />
        </div>
        
        <Categories
          items={categories}
        />
        
        <CoursesList items={courses} />
      </div>
    </>
  );
}
 
export default SearchPage;