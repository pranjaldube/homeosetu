import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Homeosetu",
  description: "Learn more about Homeosetu - The bridge between academic and clinical homeopathic knowledge",
}

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Homeosetu</h1>
        
        <div className="space-y-6 text-lg">
          <p>
            Welcome to Homeosetu - The bridge between academic and clinical homeopathic knowledge. 
            We are dedicated to advancing the practice of homeopathy through innovative technology 
            and comprehensive educational resources.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to empower homeopathic practitioners and students by providing them 
            with innovative tools and resources that bridge the gap between academic knowledge 
            and clinical practice. We believe in making homeopathic education more accessible, 
            practical, and effective.
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