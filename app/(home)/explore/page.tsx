import { db } from "@/lib/db";
import { CategoryFilters } from "@/components/category-filters";
import { SearchInputPublic } from "@/components/search-input-public";
import { CoursesListPublic } from "@/components/courses-list-public";
import { getExploreCourses } from "@/actions/get-explore-courses";
import { generateMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Link from "next/link";

interface ExplorePageProps {
  searchParams: {
    search?: string;
    categoryId?: string;
  }
}

export const metadata: Metadata = generateMetadata({
  title: "Explore Homeopathy Courses | Online Homeopathic Education",
  description: "Discover our comprehensive collection of homeopathy courses online. From beginner to advanced levels, learn clinical homeopathy, materia medica, repertory, and case-taking techniques from expert practitioners.",
  keywords: [
    "homeopathy courses online",
    "homeopathic education courses",
    "clinical homeopathy training",
    "homeopathic medicine courses",
    "homeopathy learning platform",
    "homeopathic certification courses",
    "homeopathy workshops online",
    "homeopathic repertory courses",
    "homeopathic materia medica",
    "homeopathy case studies",
    "homeopathic research courses",
    "homeopathy continuing education",
    "homeopathy professional development",
    "online homeopathy classes",
    "homeopathy distance learning"
  ],
  url: "/explore",
});

const ExplorePage = async ({
  searchParams
}: ExplorePageProps) => {
  // Fetch categories
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  // Fetch courses based on search params
  const courses = await getExploreCourses({
    ...searchParams
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
          <p className="text-gray-600 mt-1">
            Discover our vast collection of homeopathy courses and expand your knowledge
          </p> 
          <Link href="/faq" className="text-1xl font-semibold">FAQ</Link>
        </div>
        <SearchInputPublic />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-8 overflow-x-auto">
        <CategoryFilters categories={categories} />
      </div>

      <div className="mt-8">
        <CoursesListPublic items={courses} />
      </div>
    </div>
  );
};

export default ExplorePage; 