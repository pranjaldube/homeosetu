import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getCourse } from "@/actions/course";
import { getChapter, getNextChapter } from "@/actions/chapter";
import { getPurchase } from "@/actions/purchase";
import { getMuxData } from "@/actions/mux";
import { getAttachments } from "@/actions/attachments";
import { getUserProgress } from "@/actions/userProgress";

import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { FileViewer } from "./_components/file-viewer";

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  console.time("ChapterIdPage Execution");

  // Authenticate user
  console.time("Auth time");
  const { userId } = await auth();
  console.timeEnd("Auth time");

  if (!userId) {
    return redirect("/");
  }

  // Parallel fetch of course, chapter, and purchase
  console.time("Initial Data Fetch");
  const coursePromise = getCourse(params.courseId);
  const chapterPromise = getChapter(params.chapterId);
  const purchasePromise = getPurchase(userId, params.courseId);

  const [course, chapter, purchase] = await Promise.all([
    coursePromise,
    chapterPromise,
    purchasePromise,
  ]);
  console.timeEnd("Initial Data Fetch");

  if (!course || !chapter) {
    return redirect("/");
  }

  // Check if purchase is expired
  let isPurchaseExpired = false;
  const EXPIRY_DAYS = course.courseTimeLimit || 0;
  if (purchase && purchase.createdAt && EXPIRY_DAYS !== 0) {
    const now = new Date();
    const createdAt = new Date(purchase.createdAt);
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    isPurchaseExpired = diffDays > EXPIRY_DAYS;
  }

  // Determine if additional data should be fetched
  const shouldFetchAdditional = chapter.isFree || purchase;

  console.time("Additional Data Fetch");
  const attachmentsPromise = purchase ? getAttachments(params.courseId) : Promise.resolve([]);
  const muxDataPromise = shouldFetchAdditional ? getMuxData(params.chapterId) : Promise.resolve(null);
  const nextChapterPromise = shouldFetchAdditional ? getNextChapter(params.courseId, chapter.position) : Promise.resolve(null);
  const userProgressPromise = getUserProgress(userId, params.chapterId);

  const [attachments, muxData, nextChapter, userProgress] = await Promise.all([
    attachmentsPromise,
    muxDataPromise,
    nextChapterPromise,
    userProgressPromise,
  ]);
  console.timeEnd("Additional Data Fetch");

  const isLocked = (!chapter.isFree && !purchase) || isPurchaseExpired;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  console.timeEnd("ChapterIdPage Execution");

  return (
    <div>
      {(userProgress?.isCompleted && !isLocked) && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner variant="warning" label="You need to purchase this course to watch this chapter." />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {(purchase && !isPurchaseExpired) ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                courseData={course}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4 space-y-3">
                {!isPurchaseExpired && attachments.map((attachment) => (
                  <FileViewer
                    key={attachment.id}
                    attachment={attachment}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
