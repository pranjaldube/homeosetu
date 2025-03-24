"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";

interface CourseCardPublicProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  category: string;
};

export const CourseCardPublic = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  category
}: CourseCardPublicProps) => {
  const router = useRouter();
  const { user } = useUser();

  const handleClick = () => {
    if (user) {
      router.push(`/courses/${id}`);
    } else {
      router.push(`/sign-in?redirectUrl=/courses/${id}`);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <div className="group hover:shadow-md transition-all duration-300 overflow-hidden border rounded-xl p-3 h-full bg-white hover:scale-[1.01]">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            alt={title}
            src={imageUrl || "/placeholder-course.jpg"}
          />
          <div className="absolute top-2 right-2 bg-purple-900/90 text-white px-2 py-1 rounded text-xs font-semibold">
            {formatPrice(price)}
          </div>
        </div>
        <div className="flex flex-col pt-3">
          <div className="text-lg font-medium group-hover:text-purple-700 transition line-clamp-2 min-h-[56px]">
            {title}
          </div>
          <p className="text-xs text-purple-600 bg-purple-100 inline-block px-2 py-1 rounded-full w-fit mt-2">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 