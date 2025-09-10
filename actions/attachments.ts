import { db } from "@/lib/db";

export const getAttachments = async (courseId: string) => {
  return db.attachment.findMany({
    where: {
      courseId: courseId,
    },
  });
};
