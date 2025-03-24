"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center w-full px-4 py-3 my-1 text-sm font-medium transition-all rounded-md hover:bg-slate-100",
        isActive 
          ? "bg-purple-50 text-purple-700" 
          : "text-slate-600"
      )}
    >
      <div className="flex items-center gap-x-3">
        <Icon
          size={20}
          className={cn(
            isActive 
              ? "text-purple-700" 
              : "text-slate-500"
          )}
        />
        {label}
      </div>
    </button>
  )
}