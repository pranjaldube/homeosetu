import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/providers/toaster-provider"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import { Announcements } from "@/components/announcements" // Adjust this path if necessary
import { CSPostHogProvider } from "@/components/providers/posthog-provider"

const inter = Inter({ subsets: ["latin"] })

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
    <CSPostHogProvider>
      <html lang="en">
        <body className={inter.className}>
          <Announcements />
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow pt-10">
              {" "}
              {/* Adjusted to account for the fixed Announcements bar */}
              <ConfettiProvider />
              <ToastProvider />
              {children}
            </div>
          </div>
        </body>
      </html>
    </CSPostHogProvider>
  )
}
