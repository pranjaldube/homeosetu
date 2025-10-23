import { generateStructuredData } from '@/lib/seo'

interface StructuredDataProps {
  type: 'Organization' | 'Course' | 'Article' | 'FAQPage'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = generateStructuredData({ type, data })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

// Course-specific structured data component
interface CourseStructuredDataProps {
  course: {
    id: string
    title: string
    description?: string
    imageUrl?: string
    price?: number
    isFree?: boolean
    createdAt: string
    updatedAt: string
    category?: {
      name: string
    }
  }
}

export function CourseStructuredData({ course }: CourseStructuredDataProps) {
  return (
    <StructuredData
      type="Course"
      data={course}
    />
  )
}

// FAQ structured data component
interface FAQStructuredDataProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  return (
    <StructuredData
      type="FAQPage"
      data={{ faqs }}
    />
  )
}
