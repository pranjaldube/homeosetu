"use client"

import React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"

// Define main navigation links
const MAIN_LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Study Courses",
    href: "/explore"
  },
  {
    title: "Software",
    href: "/software",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
  },
]

export const Navbar: React.FC = () => {
  const router = useRouter()
  const { user } = useUser()

  return (
    <nav className="bg-white">
      <div className="mx-4 lg:mx-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div
              onClick={() => router.push("/")}
              className="cursor-pointer relative after:absolute after:inset-0 after:bg-[#8C44FF] after:mix-blend-soft-light after:rounded-lg"
            >
              <Image
                className="grayscale"
                src="/logo.png"
                height="100"
                width="100"
                alt="Logo"
                priority
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Main navigation links */}
                {MAIN_LINKS.map((link) => (
                  <NavigationMenuItem key={link.title}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {link.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
              onClick={() =>
                user ? router.push("/dashboard") : router.push("/sign-in")
              }
            >
              {user ? "Dashboard" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
