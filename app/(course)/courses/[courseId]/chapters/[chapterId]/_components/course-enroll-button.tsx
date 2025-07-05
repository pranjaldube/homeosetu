"use client"

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"

interface CourseEnrollButtonProps {
  price: number
  courseId: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      const res = await loadRazorpay()
      if (!res) {
        alert("Razorpay SDK Failed to load")
        setIsLoading(false)
        return
      }

      const response = await axios.post(`/api/courses/${courseId}/razorpay`)
      const { id, amount, currency } = response.data

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Course Purchase",
        description: "Course Enrollment",
        order_id: id,
        handler: async function (response: any) {
          try {
            await axios.post(`/api/courses/${courseId}/verify`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            })

            window.location.href = `/courses/${courseId}?success=1`
          } catch (error) {
            toast.error("Payment verification failed")
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@doe.com",
        },
        theme: {
          color: "#2563eb",
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)} + GST
    </Button>
  )
}
