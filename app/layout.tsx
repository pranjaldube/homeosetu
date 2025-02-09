import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ToastProvider } from "@/components/providers/toaster-provider"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import { CSPostHogProvider } from "@/components/providers/posthog-provider"
import { ClerkProvider } from "@clerk/nextjs"

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
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <ConfettiProvider />
            <ToastProvider />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </CSPostHogProvider>
  )
}
