import { db } from "@/lib/db";

export const getCourse = async (courseId: string) => {
  return db.course.findUnique({
    where: {
      isPublished: true,
      id: courseId,
    },
  });
};
