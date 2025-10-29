"use client";

import React, { useState } from "react";
import posthog from "posthog-js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react"; // icons

const MAIN_LINKS = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about-us" },
  { title: "Study Courses", href: "/explore" },
  { title: "Software", href: "/software" },
  {
    title: "Support",
    children: [
      { title: "Clinical Resource", href: "/support/clinical-resource" },
      { title: "Mentorship", href:"/support/mentorship"},
      { title: "Blog", href: "/support/blog" },
      // { title: "Forum", href: "/support/forum" },
    ],
  },
  { title: "Contact Us", href: "/contact-us" },
  { title: "Cart", href: "/cart" },

];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="mx-4 lg:mx-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => {
              posthog.capture("navbar_click", { target: "logo", href: "/" });
              router.push("/");
            }}
            className="cursor-pointer relative after:absolute after:inset-0 after:bg-[#8C44FF] after:mix-blend-soft-light after:rounded-lg"
          >
            <Image
              className="grayscale"
              src="/logo.png"
              height={100}
              width={100}
              alt="Logo"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {MAIN_LINKS.map((link) => (
              <div key={link.title} className="relative group">
                {link.children ? (
                  <div className="relative">
                    {/* Trigger */}
                    <button
                      onClick={() => {
                        posthog.capture("navbar_click", { target: link.title, type: "dropdown_toggle" });
                        setIsOpen((prev) => !prev);
                      }}
                      className="px-3 py-2 text-sm font-medium text-gray-950 hover:bg-accent rounded-md flex items-center gap-1"
                    >
                      {link.title}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-md z-50 min-w-[200px]">
                        <ul className="flex flex-col">
                          {link.children.map((child) => (
                            <li key={child.title}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-md"
                                onClick={() => {
                                  posthog.capture("navbar_click", { target: child.title, href: child.href, parent: link.title });
                                  setIsOpen(false);
                                }}
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href!}
                    className="px-3 py-2 text-sm font-medium text-gray-950 hover:bg-accent rounded-md"
                    onClick={() => posthog.capture("navbar_click", { target: link.title, href: link.href })}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Login / Dashboard Button */}
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
              onClick={() => {
                posthog.capture("navbar_click", { target: user ? "dashboard" : "login" });
                user ? router.push("/dashboard") : router.push("/sign-in");
              }}
            >
              {user ? "Dashboard" : "Login"}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t p-4 space-y-4">
          {MAIN_LINKS.map((link) =>
            link.children ? (
              <div key={link.title}>
                <div className="font-medium">{link.title}</div>
                <div className="pl-4 mt-1 space-y-2">
                  {link.children.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      className="block text-gray-600 hover:text-gray-900"
                      onClick={() => {
                        posthog.capture("navbar_click", { target: child.title, href: child.href, parent: link.title, device: "mobile" });
                        setMobileOpen(false);
                      }}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.title}
                href={link.href!}
                className="block text-gray-700 font-medium"
                onClick={() => {
                  posthog.capture("navbar_click", { target: link.title, href: link.href, device: "mobile" });
                  setMobileOpen(false);
                }}
              >
                {link.title}
              </Link>
            )
          )}

          <button
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
            onClick={() => {
              posthog.capture("navbar_click", { target: user ? "dashboard" : "login", device: "mobile" });
              setMobileOpen(false);
              user ? router.push("/dashboard") : router.push("/sign-in");
            }}
          >
            {user ? "Dashboard" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
};