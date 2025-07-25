"use client"

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"

import { useRouter } from "next/navigation"

interface CoursePrice {
  price: number | null
  usdPrice: number | null
}

interface CourseEnrollButtonProps {
  courseData: CoursePrice
  courseId: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export const CourseEnrollButton = ({
  courseData,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useUser()
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: "",
    address1: "",
    city: "",
    state: "",
    country: "",
    pinCode: ""
  })

  const currency = document.cookie.split("; ").find((c) => c.startsWith("preferred_currency="))?.split("=")[1] || "INR";

  const price:number | null = (!currency || currency === "INR") ? courseData?.price : courseData?.usdPrice

  const sendToCheckout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("enrolledCourse", courseId)
      localStorage.setItem("enrolledCourseData", JSON.stringify(courseData))
    }

    document.cookie = `enrolledCourse=${courseId}`
    document.cookie = `enrolledCourseData=${JSON.stringify(courseData)}`

    router.push("/checkout")
  }


  return (
    <>
      <Button
        onClick={sendToCheckout}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto"
      >
        Enroll for {(!currency || currency === "INR") ? `${formatPrice(price)} + GST` : formatPrice(price)}
      </Button>
    </>
  )
}
