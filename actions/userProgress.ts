import { db } from "@/lib/db";

export const getUserProgress = async (userId: string, chapterId: string) => {
  return db.userProgress.findUnique({
    where: {
      userId_chapterId: {
        userId,
        chapterId,
      },
    },
  });
};
