'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ComboBox } from './comboBox';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { useUser } from '@clerk/nextjs';
import { set } from 'zod';

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

// Step progress component
const StepProgress = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Enroll', 'Checkout', 'Payment'];

  return (
    <div className="flex items-center justify-center space-x-8 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center space-x-2">
            <div
              className={`w-4 h-4 rounded-full border-2 ${currentStep === index + 1 ? 'border-black' : 'border-gray-400'
                } flex items-center justify-center`}
            >
              <div
                className={`w-2 h-2 rounded-full ${currentStep === index + 1 ? 'bg-black' : 'bg-gray-400'
                  }`}
              />
            </div>
            <span
              className={`text-sm ${currentStep === index + 1 ? 'text-black font-semibold' : 'text-gray-500'
                }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-10 border-t border-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function CheckoutPage() {

    const {user} = useUser()
    const router = useRouter()
    const courseId = localStorage.getItem('enrolledCourse')
    const courseData = JSON.parse(localStorage.getItem('enrolledCourseData') || '{}')

  const [form, setForm] = useState({
    fullName: '',
    country: '',
    address1: '',
    pinCode: '',
    city: '',
    state: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [counponCode, setCounponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(courseData?.price);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      setForm({
        fullName:"",
        address1: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
      })
    } catch (error) {
      console.error(error)
      toast.error("Failed to save address")
    }
  }

  const getUserAddress = async () => {
    if (!user?.id) {
      toast.error("User not found")
      return
    }

    try {
      const res = await axios.get("/api/address/", {
        params: { userId: user.id },
      })

      const userAddress = res.data.exists
      if(!userAddress){
        return
      }

      setForm({
        fullName: userAddress?.fullName,
        country: userAddress?.country,
        address1: userAddress?.address1,
        pinCode: userAddress?.pinCode,
        city: userAddress?.city,
        state: userAddress?.state,
      })

    } catch (err) {
      console.error(err)
      toast.error("Error checking address in checkout page")
    }
  }

  const checkCouponCode = async () => {
    try {
      if(counponCode === ""){
        toast.error("Please enter a coupon code")
        return;
      }
      const res = await axios.post("/api/coupon", {
        courseId:courseId,
        couponCode:counponCode,
      })

      if(res.data === "Missing couponCode"){
        toast.error("Missing CouponCode")
        return;
      }else if(res.data === "Unauthorized"){
        toast.error("Unauthorized")
        router.back()
        return;
      }else if(res.data === "No coupons available for this course" || res.data === "Invalid Coupon Code"){
        toast.error("Invalid Coupon Code")
        return;
      }else if(res.data === "Coupon limit exceeded"){
        toast.error("Coupon limit exceeded")
        return;
      }

      const couponDiscount = res.data.discount
      if (typeof couponDiscount === 'number') {
        setDiscountAmount(couponDiscount);
        setDiscountedPrice(originalPrice - couponDiscount)
        setCouponApplied(true);
      }
      
    }catch(error){
      console.log("[CHECK_COUPON_CODE]",error)
      toast.error("Something went wrong")
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

  useEffect(() => {
    if (!courseId || !courseData) {
      router.back(); 
      return;
    }
    getUserAddress();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Step progress bar */}
      <StepProgress currentStep={2} />

      {/* Combined Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Address Form */}
        <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">Enter your Address</h1>
          <form onSubmit={sendAddress} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
              <Input id="fullName" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
            </div>

            <ComboBox label="Country" options={countries} value={form.country} onChange={(value: string) => setForm({ ...form, country: value })} />

            {form.country === 'India' && (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address1" className="text-sm font-medium text-gray-700">Address</label>
                  <Input id="address1" name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} required />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="pinCode" className="text-sm font-medium text-gray-700">Pincode</label>
                  <Input id="pinCode" name="pinCode" placeholder="Pincode" value={form.pinCode} onChange={handleChange} required />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
                  <Input id="city" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                </div>

                <ComboBox label="State" options={states} value={form.state} onChange={(value: string) => setForm({ ...form, state: value })} />
              </>
            )}
          </form>
        </div>

        {/* Right: Coupon Section */}
        <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Available Coupons</h2>

          <div className="space-y-4">
            {/* Example Coupon */}
            {/* <div className="border border-dashed border-gray-400 p-4 rounded-lg bg-purple-50">
              <h3 className="text-lg font-bold text-purple-700">SAVE20</h3>
              <p className="text-sm text-gray-700">Get 20% off on your order. Valid for today only!</p>
              <div className="mt-2">
                <Button size="sm" className="bg-purple-700 hover:bg-purple-800 text-white">Apply</Button>
              </div>
            </div>

            <div className="border border-dashed border-gray-400 p-4 rounded-lg bg-green-50">
              <h3 className="text-lg font-bold text-green-700">FREESHIP</h3>
              <p className="text-sm text-gray-700">Free shipping on orders above ₹499.</p>
              <div className="mt-2">
                <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white">Apply</Button>
              </div>
            </div> */}

            {/* Coupon Input */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
              <label htmlFor="couponCode" className="text-sm font-medium text-gray-700">Have a coupon code?</label>
              <div className="flex items-center gap-2">
                <Input id="couponCode" placeholder="Enter code" value={counponCode} onChange={(e) => setCounponCode(e.target.value)} />
                <Button type="button" variant="outline" onClick={checkCouponCode}>Apply</Button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium text-gray-800">{courseData.title}</p>
                  {/* <p className="text-sm text-gray-500">Course Enrollment</p> */}
                </div>
                <div className="text-right">
                  <p className={`text-base font-semibold ${couponApplied ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    ₹{originalPrice}
                  </p>
                  <p className="text-xs text-gray-500">+ GST</p>
                </div>
              </div>

              {/* Discount Row (if coupon applied) */}
              {couponApplied && (
                <div className="flex items-center justify-between text-green-700">
                  <p className="text-sm font-medium">Coupon Applied</p>
                  <p className="text-sm font-semibold">− ₹{discountAmount}</p>
                </div>
              )}

              {/* Total Section */}
              <div className="flex items-center justify-between pt-2">
                <p className="font-semibold text-lg text-gray-900">Total</p>
                <p className="text-lg font-bold text-purple-700">
                  ₹{couponApplied ? discountedPrice : originalPrice} + GST
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white" onClick={onClick}>
                Proceed to Payment...
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}