import { Metadata } from "next"
import { generateMetadata } from "@/lib/seo"
import HomePageClient from "./_components/home-page-client"

export const metadata: Metadata = generateMetadata({
  title: "Homeosetu — Homeopathy Courses & Clinical Resources",
  description: "Structured homeopathy education for students and clinicians: modular courses, interactive repertory tools, materia medica lessons, notes, live webinars.",
  keywords: [
    "homeopathy education",
    "homeopathic courses online",
    "clinical homeopathy training",
    "homeopathic medicine education",
    "homeopathy learning platform",
    "homeopathic certification",
    "homeopathy workshops",
    "homeopathic mentorship",
    "homeopathy clinical practice",
    "homeopathic repertory",
    "homeopathic materia medica",
    "homeopathy case studies",
    "homeopathic research",
    "homeopathy continuing education",
    "homeopathy professional development"
  ],
  url: "/",
})

export default function HomePage() {
  return <HomePageClient />
}