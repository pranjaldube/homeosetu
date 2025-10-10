import { Category, Course } from "@prisma/client";
import { CourseCardPublic } from "@/components/course-card-public";

type CourseWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
};

interface CoursesListPublicProps {
  items: CourseWithCategory[];
}

export const CoursesListPublic = ({
  items
}: CoursesListPublicProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {items.map((item) => (
          <CourseCardPublic
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            category={item?.category?.name || "General"}
            dollar={item?.usdPrice!}
            courseDuration={item?.courseDuration!}
            courseTimeLimit={item?.courseTimeLimit}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10 p-8 rounded-lg border border-dashed">
          <p className="text-xl font-medium mb-2">No courses found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
} 