"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInputPublic = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        search: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search
        className="h-4 w-4 absolute top-3 left-3 text-slate-600"
      />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-purple-600 md:w-[300px] lg:w-[400px]"
        placeholder="Search courses by title or content..."
      />
    </div>
  )
} 