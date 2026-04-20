import { generateMetadata } from "@/lib/seo"
import { Metadata } from "next"
import { FAQStructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = generateMetadata({
  title: "Frequently Asked Questions | Homeosetu Homeopathy Education",
  description: "Find answers to common questions about our homeopathy courses, payment methods, technical requirements, and support. Get help with account registration, course access, and billing inquiries.",
  keywords: [
    "homeopathy FAQ",
    "homeopathic education questions",
    "homeopathy course help",
    "homeopathy learning support",
    "homeopathic training FAQ",
    "homeopathy payment questions",
    "homeopathy technical support",
    "homeopathy account help",
    "homeopathy course access",
    "homeopathy billing support",
    "homeopathy refund policy",
    "homeopathy learning platform help",
    "homeopathic education support",
    "homeopathy student assistance",
    "homeopathy platform guide"
  ],
  url: "/faq",
})

const faqData = [
  {
    question: "How do I create an account?",
    answer: "Visit www.homeosetu.com, click Explore courses or login (top right option in the main page), enter your email address (Use Google Account) or enter your email id and password. It will open up the dashboard."
  },
  {
    question: "I forgot my password. What should I do?",
    answer: "If you have logged in through Google, choose the correct email id and it will allow access. If you have manually submitted password at the time of sign up on the login page, click Forgot Password, enter your email, and follow the reset link sent to you. An OTP will be generated and sent to your email address, please enter those in the box seen and reset your password."
  },
  {
    question: "How do I view the courses?",
    answer: "The dashboard shows the courses that you are currently viewing or those that are completed. If you are a new user, click on Browse Courses option, click on the desired Course and Purchase, enter the details at the time of billing and the course will be available on your dashboard."
  },
  {
    question: "Do I get a certificate on completing the courses?",
    answer: "Currently, Certificates for individual videos are not available."
  },
  {
    question: "Which payment methods do you accept?",
    answer: "For Indian users - We accept major credit/debit cards, UPI, and net banking. For International users – Payment through credit cards on the links provided besides each video."
  },
  {
    question: "My payment was deducted but I did not get an invoice?",
    answer: "Please send a screenshot of your date of payment and transaction details to homeosetu@gmail.com and we will respond soon."
  },
  {
    question: "My payment was deducted but I did not get access to the video?",
    answer: "Please send a screenshot of your date of payment and transaction details to homeosetu@gmail.com and we will respond soon."
  },
  {
    question: "What is your refund policy?",
    answer: "Kindly refer our refund and Return policy mentioned on homepage."
  },
  {
    question: "What are the technical requirements?",
    answer: "A modern browser (Chrome, Firefox, Safari, Edge), internet speed ≥3 Mbps, and up-to-date video codecs."
  },
  {
    question: "How can I get help?",
    answer: "For Any Payment related issue or technical assistance, email homeosetu@gmail.com or kindly send a WhatsApp to +91 9975461833 with screenshot of details. We will get back to you with solutions as early as possible."
  }
]

const categories = [
  { title: "Account & Registration", questions: [0, 1] },
  { title: "Browsing Courses", questions: [2, 3] },
  { title: "Payment", questions: [4, 5, 6, 7] },
  { title: "Technical & Support", questions: [8, 9] },
]

export default function Page() {
  return (
    <>
      <FAQStructuredData faqs={faqData} />
      <div className="container min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-8">
            Frequently Asked Questions
          </h1>

          {categories.map((category) => (
            <section key={category.title} className="mb-10">
              <h2 className="text-2xl font-heading font-bold mb-6 text-foreground">
                {category.title}
              </h2>

              <div className="space-y-6">
                {category.questions.map((qIndex) => {
                  const faq = faqData[qIndex]
                  return (
                    <div key={qIndex} className="border-b border-border pb-6">
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}

          <div className="mt-12 p-6 bg-brand-primary-surface rounded-lg">
            <h2 className="text-xl font-heading font-bold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground">
              Email us at{" "}
              <a href="mailto:homeosetu@gmail.com" className="text-brand-primary underline">
                homeosetu@gmail.com
              </a>{" "}
              or WhatsApp{" "}
              <span className="text-brand-primary">+91 9975461833</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
