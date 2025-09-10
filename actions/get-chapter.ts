import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
};

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    console.time("[GET_CHAPTER] Total Execution Time");

    console.time("[GET_CHAPTER] Fetch Purchase");
    const purchase = await db.purchase.findFirst({
      where: {
        userId,
        courseId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.timeEnd("[GET_CHAPTER] Fetch Purchase");

    console.time("[GET_CHAPTER] Fetch Course");
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      }
    });
    console.timeEnd("[GET_CHAPTER] Fetch Course");

    let isPurchaseExpired = false;
    const EXPIRY_DAYS = course?.courseTimeLimit || 0;
    if (purchase && purchase.createdAt && EXPIRY_DAYS !== 0) {
      console.time("[GET_CHAPTER] Calculate Expiry");
      const now = new Date();
      const createdAt = new Date(purchase.createdAt);
      const diffTime = Math.abs(now.getTime() - createdAt.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      isPurchaseExpired = diffDays > EXPIRY_DAYS;
      console.timeEnd("[GET_CHAPTER] Calculate Expiry");
    }

    console.time("[GET_CHAPTER] Fetch Chapter");
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      }
    });
    console.timeEnd("[GET_CHAPTER] Fetch Chapter");

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      console.time("[GET_CHAPTER] Fetch Attachments");
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId
        }
      });
      console.timeEnd("[GET_CHAPTER] Fetch Attachments");
    }

    if (chapter.isFree || purchase) {
      console.time("[GET_CHAPTER] Fetch MuxData");
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        }
      });
      console.timeEnd("[GET_CHAPTER] Fetch MuxData");

      console.time("[GET_CHAPTER] Fetch Next Chapter");
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          }
        },
        orderBy: {
          position: "asc",
        }
      });
      console.timeEnd("[GET_CHAPTER] Fetch Next Chapter");
    }

    console.time("[GET_CHAPTER] Fetch User Progress");
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        }
      }
    });
    console.timeEnd("[GET_CHAPTER] Fetch User Progress");

    console.timeEnd("[GET_CHAPTER] Total Execution Time");

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
      isPurchaseExpired,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
      isPurchaseExpired: false,
    };
  }
};
