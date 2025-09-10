import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { FileViewer } from "./_components/file-viewer";

const ChapterIdPage = async ({
  params,
  searchParams
}: {
  params: { courseId: string; chapterId: string },
  searchParams: {hasNextChapter?: string}
}) => {
  console.time("courseBuyout")
  console.time("Auth time")
  const { userId } = await auth();
  console.timeEnd("Auth time")

  if (!userId) {
    return redirect("/");
  }
  const shouldCheckNext = searchParams.hasNextChapter === "true";


  console.time("Get Chapter Data Time");
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
    isPurchaseExpired,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
    shouldCheckNext
  });
  console.timeEnd("Get Chapter Data Time");

  if (!chapter || !course) {
    return redirect("/")
  }


  const isLocked = (!chapter.isFree && !purchase) || isPurchaseExpired;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  console.timeEnd("courseBuyout")

  return (
    <div>
      {(userProgress?.isCompleted && !isLocked) && (
        <Banner
          variant="success"
          label="You already completed this chapter."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
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
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
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
}

export default ChapterIdPage;