"use client"

import { BarChart, BookOpen, Home, GraduationCap, Settings, User } from "lucide-react"
import { usePathname } from "next/navigation"

import { SidebarItem } from "./sidebar-item"
import { isTeacher } from "@/lib/teacher"
import { useUser } from "@clerk/nextjs"

const studentRoutes = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: GraduationCap,
    label: "Browse Courses",
    href: "/dashboard/search",
  },
]

const teacherRoutes = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard/teacher",
  },
  {
    icon: BookOpen,
    label: "My Courses",
    href: "/dashboard/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dashboard/teacher/analytics",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/teacher/settings",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname()
  const { user } = useUser()
  const userId = user?.id

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher")
  const routes = isTeacherPage ? teacherRoutes : studentRoutes

  return (
    <div className="flex flex-col w-full px-2">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      
      {!isTeacherPage && isTeacher(userId) && (
        <div className="mt-4 pt-4 border-t">
          <SidebarItem
            icon={GraduationCap}
            label="Teacher Mode"
            href="/dashboard/teacher/courses"
          />
        </div>
      )}
    </div>
  )
}
