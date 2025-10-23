"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "Singapore",
  "United Arab Emirates",
];

const INDIAN_STATES = [
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

function extractCityOnly(rawInput: string | undefined | null): string {
  if (!rawInput) return "";
  const states = INDIAN_STATES;
  const input = rawInput.toLowerCase().replace(/\s+/g, " ").trim();
  const parts = input.split(/[,|-]| in /i).map((p) => p.trim());
  for (const part of parts) {
    if (!part || states.includes(part)) continue;
    const cleaned = part.replace(/[^a-zA-Z\s]/g, "").trim();
    if (cleaned.length < 3 || /\d/.test(cleaned)) continue;
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  const fallback = input.split(" ")[0].replace(/[^a-zA-Z]/g, "");
  return fallback.charAt(0).toUpperCase() + fallback.slice(1);
}

export const AddressModal: React.FC<AddressModalProps> = ({ open, onClose, onSaved }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    country: "India",
    address1: "",
    pinCode: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (!open) return;
    const fetchAddress = async () => {
      try {
        if (!user?.id) return;
        const res = await axios.get("/api/address/", { params: { userId: user.id } });
        const userAddress = res.data.exists;
        if (userAddress) {
          setForm({
            fullName: userAddress.fullName || "",
            country: userAddress.country || "India",
            address1: userAddress.address1 || "",
            pinCode: userAddress.pinCode || "",
            city: userAddress.city || "",
            state: userAddress.state || "",
          });
          setEditing(true);
        } else {
          setEditing(true);
        }
      } catch (e) {
        // ignore
      }
    };
    fetchAddress();
  }, [open, user?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): boolean => {
    if (!form.fullName) { toast.error("Please enter your full name"); return false; }
    if (!form.country) { toast.error("Please select a country"); return false; }
    if (form.country === "India") {
      if (!form.address1 || !form.city || !form.pinCode || !form.state) {
        toast.error("Please fill all required fields");
        return false;
      }
      if (!/^\d{6}$/.test(form.pinCode.toString().slice(0, 6))) {
        toast.error("Invalid pincode");
        return false;
      }
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) { toast.error("Please login"); return; }
    if (!validate()) return;
    setLoading(true);
    try {
      const city = extractCityOnly(form.city);
      await axios.post("/api/address", {
        userId: user.id,
        fullName: form.fullName,
        city,
        address1: form.address1,
        state: form.state,
        country: form.country,
        pinCode: form.pinCode,
      });
      toast.success("Address saved successfully");
      onSaved?.();
      onClose();
    } catch (err) {
      toast.error("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!loading && !v) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Enter your Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
            <Input id="fullName" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="country" className="text-sm font-medium text-gray-700">Country</label>
            <select id="country" name="country" value={form.country} onChange={handleChange} className="border rounded px-3 py-2">
              <option value="">Select Country</option>
              {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>

          {form.country === "India" && (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="address1" className="text-sm font-medium text-gray-700">Address</label>
                <Input id="address1" name="address1" placeholder="Address Line 1" value={form.address1} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
                  <Input id="city" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="pinCode" className="text-sm font-medium text-gray-700">Pincode</label>
                  <Input id="pinCode" name="pinCode" placeholder="Pincode" value={form.pinCode} onChange={handleChange} required />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="state" className="text-sm font-medium text-gray-700">State</label>
                <select id="state" name="state" value={form.state} onChange={handleChange} className="border rounded px-3 py-2">
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;


