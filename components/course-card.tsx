"use client"
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";


interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
  dollar: number;
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
  dollar
}: CourseCardProps) => {
  const currency = document.cookie
    .split("; ")
    .find((c) => c.startsWith("preferred_currency="))
    ?.split("=")[1] || "INR";

  const actualPrice = !currency || currency === "INR" ? price : dollar

  // const {user} = useUser();
  // const [country, setCountry] = useState<string>("India");
  // const fetchUserAddress = async (userId: string | undefined) => {
  //   const userAddress= await axios.get("/api/address",{
  //     params: { userId }
  //   })
  //   setCountry(userAddress.data.country)
  // }

  // useEffect(()=>{
  //   fetchUserAddress(user?.id)
  // },[user?.id])

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {currency === "INR" ? `${formatPrice(actualPrice)} + GST` : formatPrice(actualPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}