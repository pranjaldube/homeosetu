"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Microscope,
  Users,
  GraduationCap,
  ArrowRight,
  Video,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { StatsSection } from "@/components/stats-section";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

const TESTIMONIALS = [
  {
    content:
      "Best wishes for all your future endeavours, but your. Incredible support and timely help that we had during your stint with synergy is unmatched, I would like to personally thank you for all your efforts for us and the brand building that u did during your tenure . Cheers to your attitude it will go long way to achieve your next goals ... best wishes",
    author: "Dr Gajanan Dhanipkar",
    role: "on Facebook",
  },
  {
    content:
      "Great to work with you since it's inception as Mac in india. Best wishes for further journey",
    author: "Dr Ravi Bhandare",
    role: "on Facebook",
  },
  {
    content:
      "I have understood the importance of a physical copy of repertory, i was very used to software but never used physical copies, this has made me more curious and i come across many new rubrics and try to understand them with meaning..",
    author: "Dr Asmath Naheeda",
    role: "The Rubric Workshop Attendee",
  },
  {
    content:
      "The patient version exercise which i did has made me think broader and also i was used to few set of rubrics and meds, now my thought process has changed.",
    author: "Dr Asmath Naheeda",
    role: "The Rubric Workshop Attendee",
  },
  {
    content:
      "Thank you for changing my perceptions and teaching me importance of repertory, especially of a physical copy",
    author: "Dr Asmath Naheeda",
    role: "The Rubric Workshop Attendee",
  },
  {
    content:
      "Dr Alpesh and Dr Anshu are Mentors with punctuality and kindness in sharing their knowledge is remarkable . Explained doubts beautifully and in very understandable language",
    author: "Dr Amita Saini",
    role: "The Kingdom Workshop Attendee",
  },
  {
    content:
      "It is always wonderful learning from you sir and worth listening repeatedly.",
    author: "Dr Minakshi Gawli",
    role: "The Kingdom Workshop Attendee",
  },
  {
    content:
      "I am studying nash study streak from your lectures. It is really helpful. Thank you sir ",
    author: "Dr Dimply Bhattachrjee",
    role: "",
  },
  {
    content:
      "For the first I have watched your video giving information about capsicum 4 of my cases have solved after that..I have verified them.Thank you Sir",
    author: "Dr Radheshyam",
    role: "Hyderabad, Youtube Subscriber and Senior Homeopath",
  },
  {
    content: "Lectures are very informative",
    author: "Dr Priyanka Madan",
    role: "The Rubric Workshop Attendee",
  },
  {
    content:
      "Last week, I have treated a covid positive case with ***, started with leg pain before fever as an entry. She is covid negative then. Your Videos helped to select that similimum – Thank you.",
    author: "Dr Karthiyaini sekar",
    role: "Tamil nadu",
  },
  {
    content:
      "It was very excellent lecture. cases were shown with results, sounds of coughing, potency selection and repetition specific nosodes",
    author: "Dr Purva",
    role: "Coughs Decoded Attendee",
  },
];

const FEATURES = [
  {
    title: "Expert Instructors",
    description:
      "Learn from experienced homeopaths with decades of clinical practice.",
    icon: GraduationCap,
  },
  {
    title: "Structured Courses",
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
    title: "Growing Community",
    description: "Connect with peers and instructors in our growing community.",
    icon: Users,
  },
];

const STATS = [
  {
    value: "5,000+",
    label: "Students Enrolled",
    icon: <Users className="h-6 w-6 text-brand-primary" />,
  },
  {
    value: "25+",
    label: "Expert Instructors",
    icon: <GraduationCap className="h-6 w-6 text-brand-primary" />,
  },
  {
    value: "100+",
    label: "Courses & Webinars",
    icon: <Video className="h-6 w-6 text-brand-primary" />,
  },
  {
    value: "95%",
    label: "Student Satisfaction",
    icon: <Smile className="h-6 w-6 text-brand-primary" />,
  },
];

export default function HomePageClient() {
  return (
    <div className="bg-surface">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-brand-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                The Bridge Between Academic and Clinical Homeopathy
              </h1>
              <p className="text-white/80 text-lg mb-8 max-w-lg">
                Structured education and clinical tools built by practitioners,
                for practitioners. Learn from experienced homeopaths and practice
                with our Kent Repertory software.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/explore">
                  <Button
                    size="lg"
                    className="bg-white text-brand-primary hover:bg-white/90 rounded-full px-8"
                  >
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/software/access">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 rounded-full px-8"
                  >
                    Try Kent Repertory
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative w-[400px] h-[320px]">
              <Image
                src="/images/slide2.png"
                alt="Homeosetu homeopathy education platform"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-4 bg-surface-muted border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-sm">
            Trusted by <span className="font-semibold text-foreground">5,000+</span> practitioners
            across <span className="font-semibold text-foreground">100+ colleges</span> in India
          </p>
        </div>
      </section>

      {/* Kent Repertory Callout */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 bg-brand-secondary-surface rounded-lg p-8 md:p-12 border border-border">
            <div className="flex-1">
              <p className="text-brand-secondary text-sm font-semibold mb-2 uppercase tracking-wide">
                Homeosetu WebApp
              </p>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Kent Repertory, reimagined for the modern practitioner
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Multiple repertories. Patient-version rubrics. Remedy grading and comparison.
                AI-assisted clinical search. All in your browser, available on any device.
              </p>
              <Link href="/software/access">
                <Button className="bg-brand-primary text-white hover:bg-brand-primary-hover rounded-full px-6">
                  Get Access <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-[300px] h-[200px] relative">
              <Image
                src="/images/slide2.png"
                alt="Kent Repertory software interface"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Why practitioners choose Homeosetu
            </h2>
            <p className="text-muted-foreground text-lg">
              Built by Dr. Alpesh Oza (16 years clinical experience) and Dr. Anshu Dubey,
              our platform bridges the gap between academic study and daily clinical practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 md:py-20 bg-surface-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Explore our course catalog
            </h2>
            <p className="text-muted-foreground text-lg">
              From repertory workshops to clinical deep-dives, find courses that match
              where you are in your practice.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {["All Courses", "Repertory", "Materia Medica", "Clinical", "Workshops"].map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground"
              >
                {cat}
              </span>
            ))}
          </div>

          <Link href="/explore">
            <Button variant="outline" className="rounded-full border-brand-primary text-brand-primary hover:bg-brand-primary-surface">
              Browse All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <StatsSection
        title="Our impact in numbers"
        subtitle="Join thousands of students who have transformed their homeopathic practice through our platform."
        stats={STATS}
      />

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              What practitioners say
            </h2>
            <p className="text-muted-foreground text-lg">
              Real feedback from homeopaths who have used our courses and workshops.
            </p>
          </div>

          <div className="-mx-4">
            <TestimonialCarousel
              variant="light"
              autoSlide={true}
              autoSlideInterval={4000}
              className="pb-12"
              items={TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className="h-full">
                  <TestimonialCard
                    content={testimonial.content}
                    author={testimonial.author}
                    role={testimonial.role}
                    className="h-full"
                  />
                </div>
              ))}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready to enhance your practice?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg">
            Join our platform today. Access courses, Kent Repertory, and a
            community of practitioners.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sign-in">
              <Button
                size="lg"
                className="bg-white text-brand-primary hover:bg-white/90 rounded-full px-8"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
              >
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
