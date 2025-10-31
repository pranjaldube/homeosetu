"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useCallback, useMemo, useRef, useState } from "react";
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
  const [playerKey, setPlayerKey] = useState(0);
  const playerRef = useRef<any>(null);

  const remountPlayer = useCallback(() => {
    // Force a full player re-initialization to recover from fatal pipeline errors
    setPlayerKey((k) => k + 1);
  }, []);
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
        <MuxPlayer
          key={playerKey}
          title={title}
          className={cn(
            !isReady && "hidden"
          )}
          ref={playerRef}
          preload="auto"
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          onError={(event: any) => {
            setIsReady(true);
            const message = event?.detail?.message || "Media Error: unable to decode this video.";
            toast.error(message);
            // If it's a decode/pipeline error, try a soft recovery by remounting the player
            if (typeof message === "string" && message.toLowerCase().includes("decode")) {
              remountPlayer();
            }
          }}
          onSeeking={() => {
            try {
              const el = playerRef.current as HTMLVideoElement | undefined;
              if (!el) return;
              if (el.buffered.length === 0) return;
              const targetTime = el.currentTime;
              const bufferedEnd = el.buffered.end(el.buffered.length - 1);
              // Prevent jumping past buffered end which can trigger decode errors on some browsers
              if (targetTime > bufferedEnd - 0.25) {
                el.currentTime = Math.max(0, bufferedEnd - 0.25);
              }
            } catch {}
          }}
          /* Help autoplay policies and reduce initial playback issues */
          playsInline
          autoPlay
          playbackId={playbackId}
        />
      )}
      {!isLocked && !playbackId && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <p className="text-sm">Video is processing. Please try again in a moment.</p>
        </div>
      )}
    </div>
  )
}