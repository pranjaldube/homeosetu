import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/providers/toaster-provider"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import { Announcements } from "@/components/announcements" // Adjust this path if necessary
import { Navbar } from "../(components)/navbar"
import { Footer } from "../(components)/footer"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Homeosetu",

  description:
    "Empowering you with knowledge on effective and safe homeopathy usage.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Announcements />
      <div className="flex flex-col min-h-screen mt-6">
        <div className="flex-grow pt-2">
          {" "}
          {/* Adjusted to account for the fixed Announcements bar */}
          <ConfettiProvider />
          <ToastProvider />
          <div className="relative">
            <Navbar />
            <Separator />
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
