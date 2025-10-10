import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
  shouldCheckNext: boolean; // use lowercase 'boolean' for TypeScript
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
  shouldCheckNext
}: GetChapterProps) => {
  try {
    console.time("[GET_CHAPTER] Total Execution Time");

    // Parallel fetch: purchase, course, chapter
    const purchasePromise = db.purchase.findFirst({
      where: {
        userId,
        courseId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursePromise = db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
    });

    const chapterPromise = db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    const [purchase, course, chapter] = await Promise.all([
      purchasePromise,
      coursePromise,
      chapterPromise,
    ]);

    if (!course || !chapter) {
      throw new Error("Course or chapter not found");
    }

    // Calculate if purchase is expired
    let isPurchaseExpired = false;
    const EXPIRY_DAYS = course.courseTimeLimit || 0;
    if (purchase && purchase.createdAt && EXPIRY_DAYS !== 0) {
      const now = new Date();
      const createdAt = new Date(purchase.createdAt);
      const diffTime = Math.abs(now.getTime() - createdAt.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      isPurchaseExpired = diffDays > EXPIRY_DAYS;
    }

    // Conditionally fetch attachments, muxData, nextChapter in parallel where applicable
    let attachments: Attachment[] = [];
    let muxData = null;
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      // Always fetch muxData if allowed
      const muxDataPromise = db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });

      // Conditionally fetch nextChapter based on shouldCheckNext
      const nextChapterPromise = shouldCheckNext
        ? db.chapter.findFirst({
            where: {
              courseId: courseId,
              isPublished: true,
              position: {
                gt: chapter.position,
              },
            },
            orderBy: {
              position: "asc",
            },
          })
        : Promise.resolve(null);

      const [muxDataResult, nextChapterResult] = await Promise.all([
        muxDataPromise,
        nextChapterPromise,
      ]);

      muxData = muxDataResult;
      nextChapter = nextChapterResult;
    }

    // Fetch user progress last
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

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
    console.error("[GET_CHAPTER] Error:", error);
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
