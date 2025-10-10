import { db } from "@/lib/db";

export const getChapter = async (chapterId: string) => {
  return db.chapter.findUnique({
    where: {
      id: chapterId,
      isPublished: true,
    },
  });
};

export const getNextChapter = async (courseId: string, position: number) => {
  return db.chapter.findFirst({
    where: {
      courseId: courseId,
      isPublished: true,
      position: {
        gt: position,
      },
    },
    orderBy: {
      position: "asc",
    },
  });
};
