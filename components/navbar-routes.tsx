"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, GraduationCap, ShoppingCart } from "lucide-react"
import { BackButton } from "@/app/dashboard/_components/back-button"
import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { isTeacher } from "@/lib/teacher"
import { SearchInput } from "./search-input"
import { useCartStore } from "@/hooks/cart"

export const NavbarRoutes = () => {
  const { user } = useUser()
  const userId = user?.id
  const pathname = usePathname()
  const cartItems = useCartStore((state) => state.items)

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher")
  const isCoursePage = pathname?.includes("/dashboard/courses")
  const isSearchPage = pathname === "/dashboard/search"
  const isDashboard = pathname?.includes("/dashboard")

  return (
    <div className="flex items-center justify-between w-full">
      <BackButton href="/dashboard" label="Back to Dashboard" />

      {isSearchPage && (
        <div className="hidden md:block flex-1 mr-auto">
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-2 ml-auto">
        {/* Cart Button */}
        <Link href="/cart">
          <Button size="sm" variant="ghost" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
        </Link>
        
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) && !isDashboard ? (
          <Link href="/dashboard/teacher/courses">
            <Button size="sm" variant="ghost">
              <GraduationCap className="h-4 w-4 mr-2" />
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
