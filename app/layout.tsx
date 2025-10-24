import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ToastProvider } from "@/components/providers/toaster-provider"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import { CSPostHogProvider } from "@/components/providers/posthog-provider"
import GeoCurrencyInitializer from "@/components/GeoCurrencyInitializer"
import { generateMetadata, generateStructuredData } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = generateMetadata({
  title: "Homeosetu — Homeopathy Courses & Clinical Resources",
  description: "Structured homeopathy education for students and clinicians: modular courses, interactive repertory tools, materia medica lessons, notes, live webinars.",
  keywords: [
    "homeopathy education",
    "homeopathic courses",
    "homeopathy learning platform",
    "clinical homeopathy training",
    "homeopathic medicine education",
    "homeopathy online courses",
    "homeopathic certification",
    "homeopathy workshops",
    "homeopathic mentorship",
    "homeopathy clinical practice"
  ],
  url: "/",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationStructuredData = generateStructuredData({
    type: "Organization",
    data: {}
  });

  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <html lang="en">
          <head>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationStructuredData),
              }}
            />
          </head>
          <body className={inter.className}>
            <GeoCurrencyInitializer />
            <ConfettiProvider />
            <ToastProvider />
            {children}
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  )
}
