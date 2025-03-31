import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import { BackButton } from "@/app/dashboard/_components/back-button";
import { SearchContent } from "./_components/search-content";

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
      
      <Suspense fallback={
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">Browse Courses</h1>
          <div className="md:hidden">
            <div className="h-10 w-full bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      }>
        <SearchContent categories={categories} courses={courses} />
      </Suspense>
    </>
  );
}
 
export default SearchPage;