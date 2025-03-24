"use client"

import { useState } from "react"
import toast from "react-hot-toast"
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
import { Mail, Phone, MapPin } from "lucide-react"
import { useForm, ValidationError } from "@formspree/react"

export default function Page() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? ""
  )
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault()
    handleSubmit(e)
    // Here you would typically send the form data to your backend
    // For this example, we'll just show a success message
    toast.success("Message Sent! We'll get back to you as soon as possible.")
    setName("")
    setEmail("")
    setMessage("")
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
                  required
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
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
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
              <Button type="submit" disabled={state.submitting}>
                Send Message
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
