import { db } from "@/lib/db";

export const getPurchase = async (userId: string, courseId: string) => {
  return db.purchase.findFirst({
    where: {
      userId,
      courseId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
