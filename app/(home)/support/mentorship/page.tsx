"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import AddressModal from "@/components/address-modal";

export default function Mentorship() {
  const { user } = useUser()
  const [addressOpen, setAddressOpen] = React.useState(false)

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const ensureAddress = async () => {
    if (!user?.id) return false;
    try {
      const res = await axios.get("/api/address/", { params: { userId: user.id } });
      return !!res.data.exists;
    } catch (err) {
      return false;
    }
  }

  const startPayment = async (type: "acute" | "chronic") => {
    try {
      if (!user?.id) {
        toast.error("Please login");
        return;
      }

      const hasAddress = await ensureAddress();
      if (!hasAddress) {
        setAddressOpen(true);
        return;
      }

      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Payment system failed to load");
        return;
      }

      const orderRes = await axios.post(`/api/mentorship/razorpay`, { type });
      const { id, amount, currency } = orderRes.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Mentorship Payment",
        description: type === "acute" ? "Mentorship - Acute Consultation" : "Mentorship - Chronic Consultation",
        order_id: id,
        handler: async function (response: any) {
          try {
            await axios.post(`/api/mentorship/verify`, {
              type,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success("Payment successful. Invoice will be emailed.");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        theme: { color: "#2563eb" },
      } as any;

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error("Payment failed");
    }
  }
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to Homeosetu Shishya Margdarshan
          </h2>
          <p className="text-gray-600 mb-4 text-base sm:text-lg">
            If you&apos;re an <strong>Intern/Homeopathic Beginner</strong> or{" "}
            <strong>Professional</strong> &amp; you need help in any of your
            cases, join our mentorship program -{" "}
            <strong>Shishya Margdarshan</strong> &amp; Dr. Alpesh Oza will guide
            you.
          </p>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            After Payment WhatsApp{" "}
            <span className="font-semibold">+91 9975461833</span>
            {" "}for connecting with detailed case taking with Dr. Alpesh Oza.
          </p>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row gap-4">
            <Button className="w-full sm:w-auto" onClick={() => startPayment("acute") }>
              Consult for Acute case Rs.253 + GST
            </Button>
            <Button className="w-full sm:w-auto" onClick={() => startPayment("chronic") }>
              Consult for Chronic case Rs.1271 + GST
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="/ShisyaMaghDarshan.jpeg"
            alt="Shishya Margdarshan"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
          />
        </div>
      </div>
      <AddressModal open={addressOpen} onClose={() => setAddressOpen(false)} onSaved={async () => {
        setAddressOpen(false)
        toast.success("Address saved. Please click pay again.")
      }} />
    </section>
  );
}
