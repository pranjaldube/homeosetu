"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Loader2 } from "lucide-react"

export default function Page() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post("/api/contactUs", {
        name,
        email,
        message,
      })

      if (response.data.success) {
        toast.success("Message sent")
        setName("")
        setEmail("")
        setMessage("")
      }
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      const errorMessage = error.response?.data?.error || "Failed to send message. Please try again later."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container min-h-screen p-4 flex flex-col items-center">
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
            <CardDescription>
              We{"'"}d love to hear from you. Please fill out this form or use
              our contact information below.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading}
                  required
                  rows={6}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Other Ways to Contact Us
              </h3>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>homeosetu@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+91 99754 61833</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>
                  B /701, Gold Crest 369 Chs Ltd., Opp. New Viva College, Near D
                  Mart, Virar West, Virar, Thane, Vasai, Maharashtra, India,
                  401303
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
