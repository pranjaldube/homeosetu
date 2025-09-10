import { db } from "@/lib/db";

export const getMuxData = async (chapterId: string) => {
  return db.muxData.findUnique({
    where: {
      chapterId: chapterId,
    },
  });
};
