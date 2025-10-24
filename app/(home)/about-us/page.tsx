import { Metadata } from "next"
import { generateMetadata } from "@/lib/seo"

export const metadata: Metadata = generateMetadata({
  title: "About Us",
  description: "Learn more about Homeosetu - The bridge between academic and clinical homeopathic knowledge",
  keywords: [
    "about homeopathy education",
    "homeopathic learning platform",
    "homeopathy training institute",
    "homeopathic education center",
    "homeopathy mission",
    "homeopathic instructors",
    "homeopathy clinical training",
    "homeopathic education philosophy",
    "homeopathy learning approach",
    "homeopathic practice development",
    "homeopathy education quality",
    "homeopathic teaching methods",
    "homeopathy student success",
    "homeopathic education innovation",
    "homeopathy learning community"
  ],
  url: "/about-us",
})

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Homeosetu</h1>

        <div className="space-y-6 text-lg">
          <p>Founder & CEO  - Dr Alpesh Oza - With an experience of 16 years of clinical homeopathic practice , 10 years of working with a US based homeopathic software company, visiting more than 100 homeopathic colleges in India and surveying more than 10000 homeopathic students/interns/post graduates and doctors about the problems faced by them in daily homeopathic practice,  Dr Alpesh Oza founded Homeosetu with a vision to establish a platform which provides the bridge between the academic and clinical homeopathic knowledge for the everyday homeopath.
          </p>
          <p>
            Co-Founder & COO  - Dr Anshu Dubey - Graduate in B.H.M.S with Experience of  10 years in homeopathic practice and studied for a year in the Other Song Academy, Mumbai - Dr Anshu Dubey brings to Homeosetu the balance of homeopathic knowledge and institutional expertise to establish herself as the COO of the Homeosetu.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col items-center text-center">
              <img
                src="/Dr.Alpesh.png"
                alt="Dr Alpesh Oza"
                style={{height:"100%"}}
                className="rounded-lg shadow-md w-full max-w-xs object-cover"
              />
              <p className="mt-2 text-sm text-muted-foreground font-medium">Dr Alpesh Oza</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="/Dr.Anshu.jpeg"
                alt="Dr Anshu Dubey"
                style={{height:"100%"}}
                className="rounded-lg shadow-md w-full max-w-xs object-cover"
              />
              <p className="mt-2 text-sm text-muted-foreground font-medium">Dr Anshu Dubey</p>
            </div>
          </div>

          <p>
            Welcome to Homeosetu - Homeosetu is conceptualised from the combination of two words - Homeopathy ( a modern medicine) and  setu (a sanskrit term meaning bridge).
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            We are a purpose-driven team committed to bridging the gap between academic knowledge and real-world clinical practice in homeopathy. Our mission is to serve the everyday homeopath by blending timeless classical principles with cutting-edge advancements. Through innovative technology, immersive teaching methods, and comprehensive educational resources, we strive to empower practitioners and advance the future of homeopathy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              Comprehensive learning resources for homeopathic students and practitioners
            </li>
            <li>
              Advanced tools for clinical homeopathic practice
            </li>
            <li>
              Bridge between theoretical homeopathic knowledge and practical application
            </li>
            <li>
              Community platform for knowledge sharing
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
          <p>
            <i>For the everyday homeopath, by the everyday homeopath, of the everyday homeopath</i>
          </p>
          <p>
            We envision a future where homeopathic practitioners worldwide are equipped with
            the best tools and resources to use the homeopathic literature effectively and bring it to optimal use in everyday homeopathic practice.
          </p>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
            <p>
              Join our growing community of homeopathic practitioners and students. Follow us
              on social media or reach out through our contact page to learn more about how
              we can support your homeopathic journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 