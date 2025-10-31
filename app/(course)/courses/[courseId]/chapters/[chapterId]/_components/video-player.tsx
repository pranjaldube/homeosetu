"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
};

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const [useIframe, setUseIframe] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked
          </p>
        </div>
      )}
      {!isLocked && playbackId && (

        // Mux data plus iframe fallback method 
        // <div>
        //   {!useIframe ? (
        //     <MuxPlayer
        //       title={title}
        //       className={cn(
        //         !isReady && "hidden"
        //       )}
        //       preload="auto"
        //       onCanPlay={() => setIsReady(true)}
        //       onEnded={onEnd}
        //       onError={(event: any) => {
        //         setIsReady(true);
        //         const message = "we hit a error while playing these video. Please try again";
        //         toast.error(message);
        //         setUseIframe(true);
        //       }}
        //       /* Help autoplay policies and reduce initial playback issues */
        //       playsInline
        //       autoPlay
        //       playbackId={playbackId}
        //     />
        //   ) : (
        //     <iframe
        //       src={`https://player.mux.com/${playbackId}?autoplay=1&playsinline=1`}
        //       title={title}
        //       style={{ width: "100%", border: "none", aspectRatio: "16 / 9" }}
        //       allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        //       allowFullScreen
        //     />
        //   )}
        // </div>


        // html video player
        <div>
          <video
            key={playbackId}
            controls
            autoPlay
            playsInline
            preload="auto"
            onCanPlay={() => setIsReady(true)}
            onEnded={onEnd}
            onError={(e) => {
              setIsReady(true);
              const message = "We hit an error while playing this video. Please try again.";
              toast.error(message);
            }}
            style={{ width: "100%", border: "none", aspectRatio: "16 / 9" }}
          >
            {/* Mux HLS stream */}
            <source
              src={`https://stream.mux.com/${playbackId}.m3u8`}
              type="application/x-mpegURL"
            />
            {/* Optional MP4 fallback */}
            <source
              src={`https://stream.mux.com/${playbackId}/medium.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>


      )}
      {!isLocked && !playbackId && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <p className="text-sm">Video is processing. Please try again in a moment.</p>
        </div>
      )}
    </div>
  )
}