"use client"

import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

import { useUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
  const [isOpen, setIsOpen] = useState(false)

  const { user } = useUser()

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

  const countries =
    [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo, Democratic Republic of the",
      "Congo, Republic of the",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czechia",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea, North",
      "Korea, South",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "North Macedonia",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Vatican City",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ]

  const states = [
    "JAMMU AND KASHMIR",
    "HIMACHAL PRADESH",
    "PUNJAB",
    "CHANDIGARH",
    "UTTARAKHAND",
    "HARYANA",
    "DELHI",
    "RAJASTHAN",
    "UTTAR PRADESH",
    "BIHAR",
    "SIKKIM",
    "ARUNACHAL PRADESH",
    "NAGALAND",
    "MANIPUR",
    "MIZORAM",
    "TRIPURA",
    "MEGHALAYA",
    "ASSAM",
    "WEST BENGAL",
    "JHARKHAND",
    "ODISHA",
    "CHHATTISGARH",
    "MADHYA PRADESH",
    "GUJARAT",
    "DADRA & NAGAR HAVELI & DAMAN & DIU",
    "MAHARASHTRA",
    "ANDHRAPRADESH(BEFOREADDED)",
    "KARNATAKA",
    "GOA",
    "LAKSHWADEEP",
    "KERALA",
    "TAMIL NADU",
    "PUDUCHERRY",
    "ANDAMAN & NICOBAR",
    "TELANGANA",
    "ANDHRA PRADESH",
    "LADAKH(NEWLYADDED)",
    "OTHER TERRITORY"
  ]

  function extractCityOnly(rawInput: string | undefined | null): string {
  if (!rawInput) return "";

  // Normalize input
  const input = rawInput.toLowerCase().replace(/\s+/g, " ").trim();

  // Split by common separators: comma, dash, " in "
  const parts = input.split(/[,|-]| in /i).map((p) => p.trim());

  for (const part of parts) {
    if (!part || states.includes(part)) continue;

    const cleaned = part.replace(/[^a-zA-Z\s]/g, "").trim();

    if (cleaned.length < 3 || /\d/.test(cleaned)) continue;

    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  // Fallback: get the first cleaned word
  const fallback = input.split(" ")[0].replace(/[^a-zA-Z]/g, "");
  return fallback.charAt(0).toUpperCase() + fallback.slice(1);
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const checkUserAddress = async () => {
    if (!user?.id) {
      toast.error("User not found")
      return
    }

    setIsLoading(true)
    try {
      const res = await axios.get("/api/address/check", {
        params: { userId: user.id },
      })

      const exists = res.data.exists

      if (exists) {
        onClick();
      } else {
        setIsOpen(true)
      }
    } catch (err) {
      console.error(err)
      toast.error("Error checking address")
    } finally {
      setIsLoading(false)
    }
  }


  const sendAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !user?.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if(!form.country){
      toast.error("Country field is required")
      return
    }

    if(form.country === "India" && !form.state){
      toast.error("State field is required")
      return
    }

    const city = extractCityOnly(form.city)
    try {
      const res = await axios.post("/api/address", {
        userId: user.id,
        fullName: form.fullName,
        city,
        address1: form.address1,
        state: form.state,
        country: form.country,
        pinCode: form.pinCode
      })

      toast.success("Address saved successfully")
      setIsOpen(false)
      setForm({
        fullName:"",
        address1: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
      })
      onClick();
    } catch (error) {
      console.error(error)
      toast.error("Failed to save address")
    }
  }

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
    <>
      {/* Enroll button to open the modal */}
      <Button
        onClick={checkUserAddress}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto"
      >
        Enroll for {(!currency || currency === "INR") ? `${formatPrice(price)} + GST` : formatPrice(price)}
      </Button>

      {/* Modal/Dialog for Address Form */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your Address</DialogTitle>
          </DialogHeader>
          <form onSubmit={sendAddress} className="space-y-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="address1" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Country Combobox */}
            <ComboBox
              label="Country"
              options={countries}
              value={form.country}
              onChange={(value) => setForm({ ...form, country: value })}
            />

            {/* Address Line 1 */}
            {form.country === "India" && <div className="flex flex-col gap-1">
              <label htmlFor="address1" className="text-sm font-medium text-gray-700">
                Address
              </label>
              <Input
                id="address1"
                name="address1"
                placeholder="Address Line 1"
                value={form.address1}
                onChange={handleChange}
                required
              />
            </div>}

            {/* Pincode */}
            {form.country === "India" && <div className="flex flex-col gap-1">
              <label htmlFor="address2" className="text-sm font-medium text-gray-700">
                Pincode
              </label>
              <Input
                id="pinCode"
                name="pinCode"
                placeholder="Pincode"
                value={form.pinCode}
                onChange={handleChange}
                required
              />
            </div>}

            {/* City */}
            {form.country === "India" && <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City
              </label>
              <Input
                id="city"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>}

            {/* State Combobox */}
            {form.country === "India" && <ComboBox
              label="State"
              options={states}
              value={form.state}
              onChange={(value) => setForm({ ...form, state: value })}
            />}

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Submit"}
              </Button>
            </div>
          </form>

        </DialogContent>
      </Dialog>
    </>
  )
}
