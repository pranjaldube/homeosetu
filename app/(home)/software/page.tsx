"use client"
import { Rocket } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const SELECTIVE_OPTIONS_1 = ["Yes", "No", "Maybe"];
const SELECTIVE_OPTIONS_2 = ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very Unsatisfied"];

export default function SoftwarePage() {
  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    selectiveOne: "",
    selectiveTwo: "",
    descriptiveOne: "",
    descriptiveTwo: "",
    descriptiveThree: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Validation
  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Must be a valid email address";
    if (!form.selectiveOne) newErrors.selectiveOne = "Required";
    if (!form.selectiveTwo) newErrors.selectiveTwo = "Required";
    if (!form.descriptiveOne.trim() || form.descriptiveOne.length < 5) newErrors.descriptiveOne = "Minimum 5 characters";
    if (!form.descriptiveTwo.trim() || form.descriptiveTwo.length < 5) newErrors.descriptiveTwo = "Minimum 5 characters";
    if (!form.descriptiveThree.trim() || form.descriptiveThree.length < 5) newErrors.descriptiveThree = "Minimum 5 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Survey submitted! Thank you.");
        setForm({
          name: "",
          email: "",
          selectiveOne: "",
          selectiveTwo: "",
          descriptiveOne: "",
          descriptiveTwo: "",
          descriptiveThree: "",
        });
      } else if (data.error) {
        setErrors(data.error);
        toast.error("Please check the form for errors.");
      } else {
        toast.error("Submission failed. Try again later.");
      }
    } catch {
      toast.error("Submission failed. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      {/* Hero content remains unchanged */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8 inline-block p-4 bg-white rounded-full shadow-lg">
            <Rocket className="h-12 w-12 text-purple-600 animate-bounce" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Something Amazing is Coming Soon
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Exciting things are on the horizon! We’re building a next-generation software platform and mobile app designed to transform how homeopaths learn, connect, and practice. With innovation at the core, our tools aim to empower practitioners like never before. Stay tuned—change is coming.
          </p>
        </div>
        {/* FORM APPEARS HERE, below the hero section */}
        <div className="flex justify-center mt-8">
          <Card className="w-full max-w-xl shadow-2xl relative z-20">
            <CardHeader>
              <CardTitle>Software Feedback Survey</CardTitle>
              <CardDescription>We appreciate your feedback — please fill out the survey below.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input name="name" id="name" value={form.name} onChange={handleChange} disabled={isSubmitting} required />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" id="email" type="email" value={form.email} onChange={handleChange} disabled={isSubmitting} required />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="selectiveOne">Are you interested in our upcoming software?</Label>
                  <select
                    id="selectiveOne"
                    name="selectiveOne"
                    value={form.selectiveOne}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 rounded-md border focus-visible:ring-2 focus-visible:ring-ring mt-1"
                    disabled={isSubmitting}
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    {SELECTIVE_OPTIONS_1.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.selectiveOne && <p className="text-xs text-red-500 mt-1">{errors.selectiveOne}</p>}
                </div>
                <div>
                  <Label htmlFor="selectiveTwo">How satisfied are you with our current offerings?</Label>
                  <select
                    id="selectiveTwo"
                    name="selectiveTwo"
                    value={form.selectiveTwo}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 rounded-md border focus-visible:ring-2 focus-visible:ring-ring mt-1"
                    disabled={isSubmitting}
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    {SELECTIVE_OPTIONS_2.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.selectiveTwo && <p className="text-xs text-red-500 mt-1">{errors.selectiveTwo}</p>}
                </div>
                <div>
                  <Label htmlFor="descriptiveOne">What feature do you want most in our new software?</Label>
                  <Textarea name="descriptiveOne" id="descriptiveOne" minLength={5} value={form.descriptiveOne} onChange={handleChange} disabled={isSubmitting} required rows={3} />
                  {errors.descriptiveOne && <p className="text-xs text-red-500 mt-1">{errors.descriptiveOne}</p>}
                </div>
                <div>
                  <Label htmlFor="descriptiveTwo">Describe a challenge you face that our software could solve.</Label>
                  <Textarea name="descriptiveTwo" id="descriptiveTwo" minLength={5} value={form.descriptiveTwo} onChange={handleChange} disabled={isSubmitting} required rows={3} />
                  {errors.descriptiveTwo && <p className="text-xs text-red-500 mt-1">{errors.descriptiveTwo}</p>}
                </div>
                <div>
                  <Label htmlFor="descriptiveThree">Any other comments or suggestions?</Label>
                  <Textarea name="descriptiveThree" id="descriptiveThree" minLength={5} value={form.descriptiveThree} onChange={handleChange} disabled={isSubmitting} required rows={3} />
                  {errors.descriptiveThree && <p className="text-xs text-red-500 mt-1">{errors.descriptiveThree}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 