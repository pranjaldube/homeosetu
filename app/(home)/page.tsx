"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  Award,
  Microscope,
  Users,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
  Star,
  UserCheck,
  Video,
  Smile,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/ui/carousel"
import { FeatureCard } from "@/components/feature-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { StatsSection } from "@/components/stats-section"

// Fake testimonials data
const TESTIMONIALS = [
  {
    content:
      "This platform has transformed my approach to homeopathy. The courses are comprehensive and the instructors are exceptional.",
    author: "Dr. Sarah Johnson",
    role: "Homeopathic Practitioner",
  },
  {
    content:
      "As a medical student, I found these courses to be an excellent complement to my traditional education. Highly recommended!",
    author: "Michael Chen",
    role: "Medical Student",
  },
  {
    content:
      "The knowledge I gained has been invaluable for my practice. The clinical insights were particularly helpful.",
    author: "Dr. Emily Williams",
    role: "Clinical Homeopath",
  },
]

// Features data
const FEATURES = [
  {
    title: "Expert Instructors",
    description:
      "Learn from experienced homeopaths with decades of clinical practice.",
    icon: GraduationCap,
  },
  {
    title: "Comprehensive Courses",
    description:
      "From fundamentals to advanced clinical applications of homeopathy.",
    icon: BookOpen,
  },
  {
    title: "Clinical Focus",
    description:
      "Bridge theoretical knowledge with practical clinical applications.",
    icon: Microscope,
  },
  {
    title: "Supportive Community",
    description: "Connect with peers and instructors in our growing community.",
    icon: Users,
  },
]

// Stats data
const STATS = [
  {
    value: "5,000+",
    label: "Students Enrolled",
    icon: <Users className="h-8 w-8 text-purple-500 mx-auto" />,
  },
  {
    value: "25+",
    label: "Expert Instructors",
    icon: <GraduationCap className="h-8 w-8 text-purple-500 mx-auto" />,
  },
  {
    value: "100+",
    label: "Courses & Webinars",
    icon: <Video className="h-8 w-8 text-purple-500 mx-auto" />,
  },
  {
    value: "95%",
    label: "Student Satisfaction",
    icon: <Smile className="h-8 w-8 text-purple-500 mx-auto" />,
  },
]

// Carousel slides
const carouselSlides = [
  <div
    key="slide1"
    className="relative h-[500px] w-full bg-gradient-to-r from-purple-900 to-purple-700"
  >
    <div className="container mx-auto h-full px-6">
      <div className="flex h-full items-center justify-between">
        <div className="max-w-xl z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bridge Academic & Clinical Homeopathic Knowledge
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Learn from experienced homeopaths through courses and webinars from
            the comfort of your home.
          </p>
          <div className="flex gap-4">
            <Link href="/explore">
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100"
              >
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block relative h-[400px] w-[450px]">
          <div className="absolute top-0 right-0 w-[450px] h-[400px] bg-white/10 backdrop-blur-sm rounded-l-full overflow-hidden">
            <Image
              src="/hero-courses.svg"
              alt="Homeopathy education"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  </div>,
  <div
    key="slide2"
    className="relative h-[500px] w-full bg-gradient-to-r from-blue-900 to-blue-700"
  >
    <div className="container mx-auto h-full px-6">
      <div className="flex h-full items-center justify-between">
        <div className="max-w-xl z-20">
          <div className="inline-block bg-white text-blue-800 px-4 py-1 rounded-full text-sm mb-4 font-semibold">
            NEW COURSES AVAILABLE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Innovation for the everyday homeopath
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Reimagining the literature of homeopathy for a tech-driven world
          </p>
          <Link href="/sign-in">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100"
            >
              Join Now
            </Button>
          </Link>
        </div>
        <div className="hidden md:block relative h-[400px] w-[450px]">
          <div className="absolute top-0 right-0 w-[450px] h-[400px] bg-white/10 backdrop-blur-sm rounded-l-full overflow-hidden">
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="absolute h-64 w-64 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="relative h-56 w-56 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src="/images/slide2.jpg"
                  alt="Doctor with patient"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>,
  <div
    key="slide3"
    className="relative h-[500px] w-full bg-gradient-to-r from-green-900 to-green-700"
  >
    <div className="container mx-auto h-full px-6">
      <div className="flex h-full items-center justify-between">
        <div className="max-w-xl z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Inspiration for the everyday homeopath
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Empowering you with cutting-edge insights with study courses. Join
            us in reshaping the future of homeopathy, one lecture at a time.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-in">
              <Button
                size="lg"
                className="bg-white text-green-900 hover:bg-gray-100"
              >
                Register Today
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block relative h-[400px] w-[450px]">
          <div className="absolute top-0 right-0 w-[450px] h-[400px] bg-white/10 backdrop-blur-sm rounded-l-full overflow-hidden">
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 w-32 bg-white/20 rounded-lg overflow-hidden">
                  <Image
                    src="/images/slide3.jpg"
                    alt="Community member 1"
                    width={128}
                    height={128}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="h-32 w-32 bg-white/20 rounded-lg overflow-hidden mt-8">
                  <Image
                    src="/images/slide1.jpg"
                    alt="Community member 2"
                    width={128}
                    height={128}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="h-32 w-32 bg-white/20 rounded-lg overflow-hidden">
                  <Image
                    src="/images/slide2.jpg"
                    alt="Community member 3"
                    width={128}
                    height={128}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="h-32 w-32 bg-white/20 rounded-lg overflow-hidden mt-8">
                  <Image
                    src="/images/slide3.jpg"
                    alt="Community member 4"
                    width={128}
                    height={128}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>,
]

export default function Hero() {
  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel items={carouselSlides} className="h-[500px]" />
      </section>

      {/* Discount Badge - Floating */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto flex items-center gap-4 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
          <span className="text-2xl animate-pulse">💡</span>
          <div>
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              ATTENTION!
            </span>
            <p className="text-gray-700 mt-2 font-medium">
              NEW courses coming soon
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
            WHY CHOOSE US
          </span>
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our platform bridges academic knowledge with clinical practice,
            providing comprehensive education for homeopathy practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/explore">
            <Button className="bg-purple-600 hover:bg-purple-700 transform transition-transform hover:scale-105 px-8 py-6 text-lg">
              Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex justify-center my-8">
        <div className="animate-bounce bg-purple-100 p-2 w-10 h-10 ring-1 ring-purple-200 shadow-lg rounded-full flex items-center justify-center">
          <ChevronDown className="text-purple-800 w-6 h-6" />
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection
        title="Our Impact in Numbers"
        subtitle="Join thousands of students who have transformed their homeopathic practice through our platform."
        stats={STATS}
      />

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-40 left-0 w-40 h-40 bg-purple-100 rounded-full opacity-30 transform -translate-x-1/2"></div>
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-purple-100 rounded-full opacity-20 transform translate-x-1/4"></div>

        <div className="text-center mb-16 relative z-10">
          <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from practitioners who have enhanced their clinical skills
            through our courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-800 py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="w-40 h-40 rounded-full bg-white absolute top-10 left-10 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-24 h-24 rounded-full bg-white absolute bottom-12 right-10"></div>
          <div className="w-32 h-32 rounded-full bg-white absolute top-1/2 left-1/3"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-xl">
              <span className="bg-white/20 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-6">
                GET STARTED TODAY
              </span>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Ready to Enhance Your Homeopathic Practice?
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Join our platform today and gain access to comprehensive courses
                taught by experienced practitioners. Elevate your skills and
                transform your practice.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    className="bg-white text-purple-900 hover:bg-gray-100 transform transition-transform hover:scale-105 text-lg px-8"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white/10 text-lg hover:scale-105"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative w-full md:w-[400px] h-[300px]">
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm"></div>
              <Image
                src="/hero-courses.svg"
                alt="Enhance your practice"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
