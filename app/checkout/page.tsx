"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComboBox } from "./comboBox";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/hooks/cart";

const countries = [
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
  "Zimbabwe",
];

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
  "OTHER TERRITORY",
];

// Step progress component
const StepProgress = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Enroll", "Checkout", "Payment"];

  return (
    <div className="flex items-center justify-center space-x-8 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center space-x-2">
            <div
              className={`w-4 h-4 rounded-full border-2 ${currentStep === index + 1 ? "border-black" : "border-gray-400"
                } flex items-center justify-center`}
            >
              <div
                className={`w-2 h-2 rounded-full ${currentStep === index + 1 ? "bg-black" : "bg-gray-400"
                  }`}
              />
            </div>
            <span
              className={`text-sm ${currentStep === index + 1
                  ? "text-black font-semibold"
                  : "text-gray-500"
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
  const { user } = useUser();
  const router = useRouter();

  const [courseId, setCourseId] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<any>(null);
  const [currency, setCurrency] = useState("INR");

  const [form, setForm] = useState({
    fullName: "",
    country: "",
    address1: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [counponCode, setCounponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [editing, setEditing] = useState(false);
  const [couponId, setCouponId] = useState("");
  const [savedChanges, setSavedChanges] = useState(true);
  const [userCountry, setUserCountry] = useState("India");
  const cartItems = useCartStore((state) => state.items);
  const hasSynced = useRef(false)
  const hasAddressSynced = useRef(false)
  const [paymentButtonDisable, setPaymentButtonDisable] = useState(false)
  const setItems = useCartStore((state) => state.setItems)
  const clearCart = useCartStore((state) => state.clearCart)

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum: number, course: any) => {
      if (!course) return sum;
      const price = userCountry === "India" ? course.price : course.usdPrice;
      return sum + (price || 0);
    }, 0);
  }, [cartItems, userCountry]);

  useEffect(() => {
    setOriginalPrice(totalPrice);
  }, [totalPrice]);

  // useEffect(() => {
  //   const storeCartIntoDB = async () => {
  //     if (hasSynced.current || !user?.id) {
  //       return;
  //     }
      
  //     if (cartItems.length === 0) {
  //       toast.error("Please select course first");
  //       setTimeout(() => {
  //         router.push("/explore");
  //       }, 3000);
  //       return;
  //     }

  //     setPaymentButtonDisable(true);
      
  //     try {
  //       const results = await Promise.allSettled(
  //         cartItems.map((course) =>
  //           axios.post("/api/cart", {
  //             userId: user.id,
  //             courseId: course.id,
  //           })
  //         )
  //       );

  //       // Handle failed requests
  //       const failedCourses: string[] = [];
  //       results.forEach((result, index) => {
  //         if (result.status === "rejected") {
  //           const error = result.reason;
  //           if (error.response?.status === 404) {
  //             failedCourses.push(cartItems[index].id);
  //             console.error(`Course ${cartItems[index].title} no longer exists`);
  //           } else {
  //             console.error(`Failed to add course ${cartItems[index].title}:`, error);
  //           }
  //         }
  //       });

  //       // Remove failed courses from cart
  //       if (failedCourses.length > 0) {
  //         setItems((prev) => prev.filter((c) => !failedCourses.includes(c.id)));
  //         toast.error(`${failedCourses.length} course(s) were removed from cart as they no longer exist`);
  //       }

  //       hasSynced.current = true;
  //     } catch (error) {
  //       console.error("Error syncing cart:", error);
  //       toast.error("Failed to sync cart with server");
  //     } finally {
  //       setPaymentButtonDisable(false);
  //     }
  //   };

  //   storeCartIntoDB();
  // }, [user?.id]); // Only depend on user.id, not cartItems

  useEffect(() => {
    // Load cookies and set state
    const cookies = document.cookie.split("; ").reduce((acc: any, c) => {
      const [key, value] = c.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);

    setCourseId(cookies["enrolledCourse"] || null);

    if (cookies["enrolledCourseData"]) {
      try {
        setCourseData(JSON.parse(cookies["enrolledCourseData"]));
      } catch {
        setCourseData(null);
      }
    }

    setCurrency(
      cookies["preferred_currency"] ? cookies["preferred_currency"] : "INR"
    );
  }, []);

  useEffect(() => {
    if (user && !hasAddressSynced.current) {
      getUserAddress();
      hasAddressSynced.current = true
    }
  }, [user]);

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
    e.preventDefault();
    setSavedChanges(true);
    if (!user || !user?.id || !user.emailAddresses?.[0]?.emailAddress) {
      toast.error("Please login")
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!form.country) {
      toast.error("Country field is required");
      return;
    }

    if (form.country === "India" && !form.state) {
      toast.error("State field is required");
      return;
    }

    const city = extractCityOnly(form.city);
    try {
      const res = await axios.post("/api/address", {
        userId: user.id,
        fullName: form.fullName,
        city,
        address1: form.address1,
        state: form.state,
        country: form.country,
        pinCode: form.pinCode,
      });
      setUserCountry(form.country);
      if (form.country !== "India") {
        setCouponApplied(false);
      }
      toast.success("Address saved successfully");
      setEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save address");
    }
  };

  const getUserAddress = async () => {
    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    try {
      const res = await axios.get("/api/address/", {
        params: { userId: user.id },
      });

      const userAddress = res.data.exists;
      if (!userAddress) {
        setSavedChanges(false);
        setEditing(true);
        return;
      }

      setForm({
        fullName: userAddress?.fullName,
        country: userAddress?.country,
        address1: userAddress?.address1,
        pinCode: userAddress?.pinCode,
        city: userAddress?.city,
        state: userAddress?.state,
      });
      setUserCountry(userAddress?.country);
    } catch (err) {
      console.error(err);
      toast.error("Error checking address in checkout page");
    }
  };

  const checkCouponCode = async () => {
    try {
      if (counponCode === "") {
        toast.error("Please enter a coupon code");
        return;
      }
      const res = await axios.post("/api/coupon", {
        couponCode: counponCode,
      });

      if (res.data === "Missing couponCode") {
        toast.error("Missing CouponCode");
        return;
      } else if (res.data === "Unauthorized") {
        toast.error("Unauthorized");
        router.back();
        return;
      } else if (
        res.data === "No coupons available for this course" ||
        res.data === "Invalid Coupon Code"
      ) {
        toast.error("Invalid Coupon Code");
        return;
      } else if (res.data === "Coupon limit exceeded") {
        toast.error("Coupon limit exceeded");
        return;
      }

      setCouponId(res.data.couponId);
      const couponDiscount = res.data.discount;
      if (typeof couponDiscount === "number") {
        const afterCouponDiscount = Math.round(totalPrice - (totalPrice/100)*couponDiscount)
        console.log("adsdsad",afterCouponDiscount)
        setDiscountAmount(couponDiscount);
        setDiscountedPrice(afterCouponDiscount);
        setCouponApplied(true);
      }
    } catch (error) {
      console.log("[CHECK_COUPON_CODE]", error);
      toast.error("Something went wrong");
    }
  };

  const onClick = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error("No items in cart");
        return;
      }

      // Validate all cart items have required fields
      const invalidItems = cartItems.filter(item => !item.id || !item.title);
      if (invalidItems.length > 0) {
        toast.error("Some items in cart are invalid");
        return;
      }

      setIsLoading(true);

      // Handle free purchase case
      if (couponApplied && discountedPrice === 0) {
        try {
          // Create purchases for all cart items
          await Promise.all(
            cartItems.map(course => 
              axios.post(`/api/purchase`, {
                courseId: course.id,
                userId: user?.id,
                userEmail: user?.emailAddresses?.[0]?.emailAddress,
              })
            )
          );
          clearCart();
          window.location.href = `/explore?success=1`;
          return;
        } catch (error) {
          console.error("Error creating free purchases:", error);
          toast.error("Failed to complete free purchase");
          return;
        }
      }

      const res = await loadRazorpay();
      if (!res) {
        toast.error("Payment system failed to load");
        setIsLoading(false);
        return;
      }

      // For now, process only the first item (as per current API structure)
      // TODO: Update API to handle multiple items in single payment
      const firstCourse = cartItems[0];
      const response = await axios.post(`/api/courses/${firstCourse.id}/razorpay`, {
        couponApplied: couponApplied,
        discountedPrice: discountedPrice,
        cartItems: cartItems, // Pass all items for reference
      });
      
      const { id, amount, currency } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Course Purchase",
        description: `Enrolling in ${cartItems.length} course(s)`,
        order_id: id,
        handler: async function (response: any) {
          try {
            await axios.post(`/api/courses/${firstCourse.id}/verify`, {
              couponApplied: couponApplied,
              discountedPrice: discountedPrice,
              cartItems: cartItems,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            if (couponId) {
              await axios.patch("/api/coupon", {
                couponId: couponId,
              });
            }
            
            clearCart();
            window.location.href = `/explore?success=1`;
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed");
          }
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong during payment");
    } finally {
      setIsLoading(false);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    setOriginalPrice(
      savedChanges
        ? userCountry === "India"
          ? courseData?.price
          : courseData?.usdPrice
        : courseData?.price
    );
  }, [courseData, userCountry]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Step progress bar */}
      <StepProgress currentStep={2} />

      {/* Combined Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Address Form */}
        <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Enter your Address
          </h1>
          <form onSubmit={sendAddress} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                disabled={!editing}
              />
            </div>

            <ComboBox
              label="Country"
              options={countries}
              value={form.country}
              onChange={(value: string) => setForm({ ...form, country: value })}
              disabled={!editing}
            />

            {form.country === "India" && (
              <>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="address1"
                    className="text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <Input
                    id="address1"
                    name="address1"
                    placeholder="Address Line 1"
                    value={form.address1}
                    onChange={handleChange}
                    required
                    disabled={!editing}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="pinCode"
                    className="text-sm font-medium text-gray-700"
                  >
                    Pincode
                  </label>
                  <Input
                    id="pinCode"
                    name="pinCode"
                    placeholder="Pincode"
                    value={form.pinCode}
                    onChange={handleChange}
                    required
                    disabled={!editing}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="city"
                    className="text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                    disabled={!editing}
                  />
                </div>

                <ComboBox
                  label="State"
                  options={states}
                  value={form.state}
                  onChange={(value: string) =>
                    setForm({ ...form, state: value })
                  }
                  disabled={!editing}
                />
              </>
            )}
            <div className="flex justify-end">
              {!editing && (
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="mx-4"
                >
                  Back
                </Button>
              )}
              {editing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditing(!editing);
                    setSavedChanges(true);
                  }}
                  className="mx-4"
                >
                  Cancel
                </Button>
              )}
              {!editing && (
                <Button
                  onClick={() => {
                    setEditing(!editing);
                    setSavedChanges(false);
                  }}
                  disabled={isLoading}
                  size="sm"
                  className="w-full md:w-auto "
                >
                  Edit
                </Button>
              )}
              {editing && (
                <Button type="submit" size="sm" className="w-full md:w-auto ">
                  Save Changes
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Right: Coupon Section */}
        <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
          {userCountry === "India" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Available Coupons
              </h2>

              <div className="space-y-4">
                {/* Coupon Input */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                  <label
                    htmlFor="couponCode"
                    className="text-sm font-medium text-gray-700"
                  >
                    Have a coupon code?
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="couponCode"
                      placeholder="Enter code"
                      value={counponCode}
                      onChange={(e) => setCounponCode(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={checkCouponCode}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Order Summary
            </h2>

            <div className="space-y-4">
              {paymentButtonDisable ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Syncing cart with server...</p>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No items in cart</p>
                </div>
              ) : (
                cartItems.map((course: any) => {
                  const price = userCountry === "India" ? course.price : course.usdPrice;
                  return (
                    <div
                      key={course.id}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <div className="flex items-center justify-between flex-1 ml-3">
                        <div>
                          <p className="font-medium text-gray-800">
                            {course?.title || "Unknown Course"}
                          </p>
                          {course.courseTimeLimit && (
                            <p className="text-xs text-gray-500">
                              Access: {course.courseTimeLimit} days
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-base font-semibold text-gray-800"
                              }`}
                          >
                            {userCountry === "India"
                              ? `₹${price || 0}`
                              : `$${price || 0}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {/* Discount Row (if coupon applied) */}
              {couponApplied && savedChanges && userCountry === "India" && (
                <div className="flex items-center justify-between text-green-700">
                  <p className="text-sm font-medium">Coupon Applied</p>
                  <p className="text-sm font-semibold">−{discountAmount}% OFF</p>
                </div>
              )}
              {/* Total Section */}
              <div className="flex items-center justify-between pt-2">
                <p className="font-semibold text-lg text-gray-900">Total</p>
                <p className="text-lg font-bold text-purple-700">
                  {userCountry === "India"
                    ? `₹${couponApplied ? discountedPrice : totalPrice} + GST`
                    : `$${totalPrice}`}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                disabled={paymentButtonDisable || isLoading || cartItems.length === 0}
                onClick={() => {
                  // Validate cart
                  if (cartItems.length === 0) {
                    toast.error("No items in cart");
                    return;
                  }

                  // Validate form
                  if (!form?.country) {
                    toast.error("Please select a country");
                    return;
                  }

                  if (form.country === "India") {
                    if (!form.fullName || !form.address1 || !form.city || !form.pinCode || !form.state) {
                      toast.error("Please fill all required fields");
                      return;
                    }
                  } else if (!form.fullName) {
                    toast.error("Please enter your full name");
                    return;
                  }

                  if (!savedChanges) {
                    toast.error("Please save your address changes");
                    return;
                  }

                  onClick();
                }}
              >
                {isLoading 
                  ? "Processing..." 
                  : paymentButtonDisable 
                    ? "Syncing Cart..." 
                    : couponApplied && discountedPrice === 0
                      ? "Complete Purchase"
                      : "Proceed to Payment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
