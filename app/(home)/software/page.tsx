"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Rocket } from "lucide-react";

// -----------------------------------------------------
//  TYPESCRIPT TYPES
// -----------------------------------------------------
interface SurveyForm {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  currentStatus: string;
  currentStatusOther: string;

  practiceTypes: string[];
  practiceOther: string;

  experience: string;

  timeConsumption: string[];
  timeConsumptionOther: string;

  softwareUsedLaptop: string;
  softwareUsedMobile: string;
  helpfulLaptop: string;
  helpfulMobile: string;

  repertoryUsed: string;
  rubricSource: string;
  materiaMedica: string;

  frustrationLaptop: string;
  frustrationMobile: string;

  learningSources: string[];
  cmePlatforms: string;

  toolPhrasing: string;
  toolRepertory: string;
  toolDifferential: string;
  featureSuggestions: string;

  paymentModel: string;

  earlyAccess: string;
  contactPermission: string;

  consent1: boolean;
  consent2: boolean;
  consent3: boolean;
}

interface SurveyErrors {
  [key: string]: string;
}

export default function SoftwarePage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [form, setForm] = useState<SurveyForm>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    currentStatus: "",
    currentStatusOther: "",

    practiceTypes: [],
    practiceOther: "",

    experience: "",

    timeConsumption: [],
    timeConsumptionOther: "",

    softwareUsedLaptop: "",
    softwareUsedMobile: "",
    helpfulLaptop: "",
    helpfulMobile: "",

    repertoryUsed: "",
    rubricSource: "",
    materiaMedica: "",

    frustrationLaptop: "",
    frustrationMobile: "",

    learningSources: [],
    cmePlatforms: "",

    toolPhrasing: "",
    toolRepertory: "",
    toolDifferential: "",
    featureSuggestions: "",

    paymentModel: "",

    earlyAccess: "",
    contactPermission: "",

    consent1: false,
    consent2: false,
    consent3: false,
  });
  const [language, setLanguage] = useState("Eng");
  const [errors, setErrors] = useState<SurveyErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // --------------------------------------------------------
  //  INPUT CHANGE HANDLER
  // --------------------------------------------------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    // boolean checkboxes
    if (name === "consent1" || name === "consent2" || name === "consent3") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // multi-checkbox arrays
    setForm((prev) => {
      const arr = prev[name as keyof SurveyForm] as string[];
      return {
        ...prev,
        [name]: checked ? [...arr, value] : arr.filter((v) => v !== value),
      };
    });
  };

  const validate = () => {
    const newErrors: SurveyErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.currentStatus) newErrors.currentStatus = "Select your status";

    if (form.practiceTypes.length === 0) {
      newErrors.practiceTypes = "Please select";
    }

    if (form.currentStatus === "Other" && !form.currentStatusOther.trim()) {
      newErrors.currentStatusOther = "Please specify";
    }

    if (form.practiceTypes.includes("Other") && !form.practiceOther.trim()) {
      newErrors.practiceOther = "Please specify";
    }

    if (!form.experience) {
      newErrors.experience = "Please select";
    }

    if (form.timeConsumption.length === 0) {
      newErrors.timeConsumption = "Please select";
    }

    if (!form.softwareUsedLaptop) {
      newErrors.softwareUsedLaptop = "Please specify";
    }
    if (!form.softwareUsedMobile) {
      newErrors.softwareUsedMobile = "Please specify";
    }

    if (
      form.timeConsumption.includes("Other") &&
      !form.timeConsumptionOther.trim()
    ) {
      newErrors.timeConsumptionOther = "Please specify";
    }

    if (!form.helpfulLaptop) {
      newErrors.helpfulLaptop = "Please specify";
    }
    if (!form.helpfulMobile) {
      newErrors.helpfulMobile = "Please specify";
    }
    if (!form.repertoryUsed) {
      newErrors.repertoryUsed = "Please specify";
    }
    if (!form.rubricSource) {
      newErrors.rubricSource = "Please specify";
    }
    if (!form.materiaMedica) {
      newErrors.materiaMedica = "Please specify";
    }
    if (!form.frustrationLaptop) {
      newErrors.frustrationLaptop = "Please specify";
    }
    if (!form.frustrationMobile) {
      newErrors.frustrationMobile = "Please specify";
    }
    if (form.learningSources.length === 0) {
      newErrors.learningSources = "Please select atleat one";
    }
    if (!form.cmePlatforms) {
      newErrors.cmePlatforms = "Please specify";
    }
    if (!form.toolDifferential) {
      newErrors.toolDifferential = "Please select";
    }
    if (!form.toolPhrasing) {
      newErrors.toolPhrasing = "Please select";
    }
    if (!form.toolRepertory) {
      newErrors.toolRepertory = "Please select";
    }
    if (!form.featureSuggestions) {
      newErrors.featureSuggestions = "Please specify";
    }
    if (!form.paymentModel) {
      newErrors.paymentModel = "Please select";
    }
    if (!form.earlyAccess) {
      newErrors.earlyAccess = "Please select";
    }
    if (!form.contactPermission) {
      newErrors.contactPermission = "Please select";
    }

    if (!form.consent1) {
      newErrors.consent1 = "Please click these before proceeding";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fill all required fields");

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setForm({
          fullName: "",
          phone: "",
          email: "",
          city: "",
          currentStatus: "",
          currentStatusOther: "",

          practiceTypes: [],
          practiceOther: "",

          experience: "",

          timeConsumption: [],
          timeConsumptionOther: "",

          softwareUsedLaptop: "",
          softwareUsedMobile: "",
          helpfulLaptop: "",
          helpfulMobile: "",

          repertoryUsed: "",
          rubricSource: "",
          materiaMedica: "",

          frustrationLaptop: "",
          frustrationMobile: "",

          learningSources: [],
          cmePlatforms: "",

          toolPhrasing: "",
          toolRepertory: "",
          toolDifferential: "",
          featureSuggestions: "",

          paymentModel: "",

          earlyAccess: "",
          contactPermission: "",

          consent1: false,
          consent2: false,
          consent3: false,
        });
        toast.success("Survey submitted successfully!");
      } else {
        toast.error("There are errors in your submission.");
      }
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    const target = new Date("2026-01-14T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-[80vh] relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* <Rocket className="h-12 w-12 text-purple-600 animate-bounce" /> */}
          <div className="font-bold text-4xl bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Phase 1 Launch
          </div>
          <div className="flex gap-4 justify-center py-4 mb-20">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center bg-white/10 backdrop-blur-lg rounded-xl px-5 py-4 shadow-lg border border-white/20"
              >
                <p className={`text-2xl font-semibold`}>{item.value}</p>
                <span className="text-xs uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Homeosetu Homeopathic Software/Mobile App/AI Survey
          </h1>
          <div className="space-y-4 mb-12">
            <p className="text-xl text-gray-600">
              Most homeopathic software is designed without asking the people
              who use it every day.{" "}
            </p>
            <p className="text-xl text-gray-600">
              Developers and owners talk to the stalwarts — not to the many
              homeopaths who run unique, individual practices. But those
              individual voices matter most.
            </p>
            <p className="text-xl text-gray-600">
              Take the world’s first 5-minute survey by Homeosetu to help shape
              a smarter, practitioner-friendly homeopathic app for mobile, web,
              and laptop.
            </p>
            <p className="text-xl text-gray-600">
              Join the waitlist for the Phase 1 launch.
              <br />
              Join us in co-creating a better tool:
              <br />
              Your suggestions — we build.
              <br />
              Your difficulties — we solve.
              <br />
              Your uncured queries — we guide you to cure.
              <br />
            </p>
            <p className="text-xl text-gray-600">
              Designed by everyday homeopaths, for everyday homeopaths, of
              everyday homeopaths.
              <br />
            </p>
          </div>
        </div>

        {/* SURVEY FORM */}
        <div className="flex justify-center mt-8">
          <Card className="w-full max-w-3xl shadow-2xl relative z-20">
            <div className="flex items-center justify-between p-4">
              {/* Left Side Content */}
              <div>
                <CardHeader className="p-0">
                  <CardTitle>Homeosetu Software Survey</CardTitle>
                  <CardDescription>
                    Please fill the survey below.
                  </CardDescription>
                </CardHeader>
              </div>

              {/* Right Side Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setLanguage("Eng")}
                  className={`px-4 py-2 text-sm font-medium ${
                    language === "Eng"
                      ? "bg-black text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  English
                </button>

                <button
                  onClick={() => setLanguage("Hin")}
                  className={`px-4 py-2 text-sm font-medium ${
                    language === "Hin"
                      ? "bg-black text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  Hindi
                </button>
              </div>
            </div>

            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <label className="font-semibold text-lg">
                  {language === "Eng"
                    ? "1. Basic information"
                    : "1. बुनियादी जानकारी (आवश्यक)"}
                </label>

                <div className="ml-4 space-y-4">
                  <div>
                    <Label>
                      {language === "Eng" ? "Full Name" : "पूरा नाम"}
                    </Label>
                    <Input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <Label>
                      {language === "Eng" ? "Phone Number" : "फोन नंबर"}
                    </Label>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label>
                      {language === "Eng" ? "Email Address" : "ईमेल पता"}
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label>
                      {language === "Eng" ? "City / Location" : "•	शहर / स्थान"}
                    </Label>
                    <Input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <Label>
                      {language === "Eng"
                        ? "Current Status"
                        : "वर्तमान स्थिति (एक चुनें): "}
                    </Label>
                    <select
                      name="currentStatus"
                      value={form.currentStatus}
                      onChange={handleChange}
                      className="block w-full border rounded-md px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>BHMS Student</option>
                      <option>Intern</option>
                      <option>Postgraduate</option>
                      <option>Practitioner</option>
                      <option>Other</option>
                    </select>

                    {form.currentStatus === "Other" && (
                      <Input
                        name="currentStatusOther"
                        placeholder="Please specify"
                        value={form.currentStatusOther}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    )}

                    {errors.currentStatus && (
                      <p className="text-xs text-red-500">
                        {errors.currentStatus}
                      </p>
                    )}
                  </div>
                </div>

                <div className="font-semibold text-lg mb-2">
                  {language === "Eng"
                    ? "2. Practice profile"
                    : "2. अभ्यास प्रोफ़ाइल (कई विकल्प चुन सकते हैं)"}
                </div>
                <div className="ml-4">
                  <div>
                    <Label>
                      {language === "Eng"
                        ? "Please suggest type(s)/method of your homeopathic practice"
                        : "कृपया अपने होम्योपैथिक अभ्यास के प्रकार/पद्धति बताएं (सभी लागू करें):"}
                    </Label>

                    {[
                      "Classical",
                      "Predictive",
                      "Kolkata style",
                      "IACH",
                      "Mind-based",
                      "Sensation / Synergy / Superclass",
                      "GNM",
                      "Patent products / Mixed tinctures / Potencies",
                      "Other",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 mt-1">
                        <input
                          type="checkbox"
                          name="practiceTypes"
                          value={item}
                          checked={form.practiceTypes.includes(item)}
                          onChange={handleCheckChange}
                        />
                        <span>{item}</span>
                      </div>
                    ))}

                    {form.practiceTypes.includes("Other") && (
                      <Input
                        name="practiceOther"
                        placeholder="Please specify"
                        value={form.practiceOther}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    )}
                  </div>
                  {errors.practiceTypes && (
                    <p className="text-xs text-red-500">
                      {errors.practiceTypes}
                    </p>
                  )}
                  {errors.practiceOther && (
                    <p className="text-xs text-red-500">
                      {errors.practiceOther}
                    </p>
                  )}

                  <div className="mt-4">
                    <Label>
                      {language === "Eng"
                        ? "Please select years of your clinical experience"
                        : "अपने क्लिनिकल अनुभव के वर्ष चुनें"}
                    </Label>
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select</option>
                      <option>{"<1"}</option>
                      <option>1–5</option>
                      <option>6–15</option>
                      <option>15+</option>
                      <option>25+</option>
                    </select>
                  </div>
                  {errors.experience && (
                    <p className="text-xs text-red-500">{errors.experience}</p>
                  )}
                </div>

                <div>
                  <div className="font-semibold text-lg mb-3">
                    {language === "Eng"
                      ? "3. Case documentation & analysis"
                      : "3. केस दस्तावेज़ीकरण और विश्लेषण (कई विकल्प चुन सकते हैं)"}
                  </div>
                  <div className="ml-4">
                    <Label>
                      {language === "Eng"
                        ? "Which case-work parts consume most time?"
                        : "केस का कौन सा हिस्सा सबसे अधिक समय लेता है? (सभी लागू करें)"}
                    </Label>

                    {[
                      "Case recording (history taking)",
                      "Translating patient language into rubrics",
                      "Clinical Examination",
                      "Finalizing diagnosis / totality",
                      "Searching repertory or Materia medica",
                      "Choosing potency and repetition schedule",
                      "Remedy management in follow-ups (tracking responses)",
                      "Writing prescriptions / patient instructions",
                      "Suggesting Diet & Regimen",
                      "Other",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 mt-1">
                        <input
                          type="checkbox"
                          name="timeConsumption"
                          value={item}
                          checked={form.timeConsumption.includes(item)}
                          onChange={handleCheckChange}
                        />
                        <span>{item}</span>
                      </div>
                    ))}

                    {form.timeConsumption.includes("Other") && (
                      <Input
                        name="timeConsumptionOther"
                        placeholder="Please specify"
                        value={form.timeConsumptionOther}
                        onChange={handleChange}
                        className="mt-2"
                      />
                    )}
                  </div>
                  {errors.timeConsumption && (
                    <p className="text-xs text-red-500">
                      {errors.timeConsumption}
                    </p>
                  )}
                  {errors.timeConsumptionOther && (
                    <p className="text-xs text-red-500">
                      {errors.timeConsumptionOther}
                    </p>
                  )}
                </div>

                <div>
                  <div className="font-semibold text-lg mb-3">
                    {language === "Eng"
                      ? "4. Current tools & pain points"
                      : "4. वर्तमान टूल और समस्याएँ"}
                  </div>
                  <div className="ml-4 space-y-6">
                    <div>
                      <Label>
                        {language === "Eng"
                          ? "Which homeopathy apps/software/AI do you use?"
                          : "आप कौन से होम्योपैथी ऐप/सॉफ्टवेयर/AI उपयोग करते हैं (सभी लागू करें; नाम लिखें)"}{" "}
                      </Label>
                      <div>
                        <Label>• Laptop</Label>
                        <Textarea
                          name="softwareUsedLaptop"
                          rows={2}
                          value={form.softwareUsedLaptop}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.softwareUsedLaptop && (
                        <p className="text-xs text-red-500">
                          {errors.softwareUsedLaptop}
                        </p>
                      )}
                      <div>
                        <Label>• Mobile</Label>
                        <Textarea
                          name="softwareUsedMobile"
                          rows={2}
                          value={form.softwareUsedMobile}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.softwareUsedMobile && (
                        <p className="text-xs text-red-500">
                          {errors.softwareUsedMobile}
                        </p>
                      )}
                    </div>

                    <div>
                      <div>
                        {language === "Eng"
                          ? "Most helpful feature(s) in your current app(s)"
                          : "वर्तमान ऐप/सॉफ्टवेयर की सबसे मददगार विशेषताएँ (संक्षेप)"}
                      </div>
                      <Label>• Most Helpful Features (Laptop)</Label>
                      <Textarea
                        name="helpfulLaptop"
                        rows={2}
                        value={form.helpfulLaptop}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.helpfulLaptop && (
                      <p className="text-xs text-red-500">
                        {errors.helpfulLaptop}
                      </p>
                    )}

                    <div>
                      <Label>• Most Helpful Features (Mobile)</Label>
                      <Textarea
                        name="helpfulMobile"
                        rows={2}
                        value={form.helpfulMobile}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.helpfulMobile && (
                      <p className="text-xs text-red-500">
                        {errors.helpfulMobile}
                      </p>
                    )}

                    <div>
                      <Label>
                        {language === "Eng"
                          ? "Which repertory do you use most?"
                          : "आप सबसे अधिक किस Repertory का उपयोग करते हैं? (नाम)"}
                      </Label>
                      <Input
                        name="repertoryUsed"
                        value={form.repertoryUsed}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.repertoryUsed && (
                      <p className="text-xs text-red-500">
                        {errors.repertoryUsed}
                      </p>
                    )}

                    <div>
                      <Label>
                        {language === "Eng"
                          ? "Do you check the source/author when choosing a rubric?"
                          : "क्या आप रुब्रिक चुनते समय स्रोत/लेखक चेक करते हैं?"}
                      </Label>
                      <select
                        name="rubricSource"
                        value={form.rubricSource}
                        onChange={handleChange}
                        className="block w-full border rounded-md px-3 py-2"
                      >
                        <option value="">Select</option>
                        <option>Always</option>
                        <option>Sometimes / would need to check</option>
                        <option>Never</option>
                        <option>Doesn’t Matter</option>
                      </select>
                    </div>
                    {errors.rubricSource && (
                      <p className="text-xs text-red-500">
                        {errors.rubricSource}
                      </p>
                    )}

                    <div>
                      <Label>
                        {language === "Eng"
                          ? "Which Materia medica do you consult when finalizing prescription?"
                          : "प्रिस्क्रिप्शन अंतिम करने पर आप किस Materia medica का परामर्श लेते हैं?"}
                      </Label>
                      <Textarea
                        name="materiaMedica"
                        rows={2}
                        value={form.materiaMedica}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.materiaMedica && (
                      <p className="text-xs text-red-500">
                        {errors.materiaMedica}
                      </p>
                    )}

                    <div>
                      <div>
                        {language === "Eng"
                          ? "Biggest frustration with current app/software"
                          : "वर्तमान ऐप/सॉफ्टवेयर के साथ सबसे बड़ी निराशा (प्रत्येक के लिए एक पंक्ति)"}{" "}
                      </div>
                      <Label>• Biggest frustration – Laptop</Label>
                      <Input
                        name="frustrationLaptop"
                        value={form.frustrationLaptop}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.frustrationLaptop && (
                      <p className="text-xs text-red-500">
                        {errors.frustrationLaptop}
                      </p>
                    )}

                    <div>
                      <Label>• Biggest frustration – Mobile</Label>
                      <Input
                        name="frustrationMobile"
                        value={form.frustrationMobile}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.frustrationMobile && (
                      <p className="text-xs text-red-500">
                        {errors.frustrationMobile}
                      </p>
                    )}
                  </div>
                </div>

                <div className="font-semibold text-lg mb-2">
                  {language === "Eng"
                    ? "5. Learning & continued education"
                    : "5. सीखना और सतत शिक्षा (कई विकल्प चुन सकते हैं)"}
                </div>
                <div className="ml-4">
                  <div>
                    <Label>
                      {language === "Eng"
                        ? "How do you enhance daily knowledge?"
                        : "आप रोज़ाना ज्ञान कैसे बढ़ाते हैं? (सभी लागू करें):"}
                    </Label>

                    {[
                      "Physical books",
                      "Online courses",
                      "Physical seminars / workshops",
                      "In-app content / e-books",
                      "Journals / case reports",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 mt-1">
                        <input
                          type="checkbox"
                          name="learningSources"
                          value={item}
                          checked={form.learningSources.includes(item)}
                          onChange={handleCheckChange}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  {errors.learningSources && (
                    <p className="text-xs text-red-500">
                      {errors.learningSources}
                    </p>
                  )}

                  <div className="mt-4">
                    <Label>
                      {language === "Eng"
                        ? "Which online platforms do you use for Continued Medical Education?"
                        : "आप किस ऑनलाइन प्लेटफ़ॉर्म का उपयोग करते हैं Continued Medical Education के लिए? (सूची)"}
                    </Label>
                    <Textarea
                      name="cmePlatforms"
                      rows={2}
                      value={form.cmePlatforms}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.cmePlatforms && (
                    <p className="text-xs text-red-500">
                      {errors.cmePlatforms}
                    </p>
                  )}
                </div>

                <div className="font-semibold text-lg mb-2">
                  {language === "Eng"
                    ? "6. Feature Wishlist & product fit"
                    : "6. फीचर वॉishlist और उत्पाद उपयुक्तता"}
                </div>
                <div className="ml-2">
                  {language === "Eng"
                    ? "• Would you find these tools valuable?"
                    : "• फीचर वॉishlist और उत्पाद उपयुक्तता"}
                </div>

                <div className="ml-4 space-y-6">
                  <div>
                    <Label>
                      Tool that suggests patient-version phrasing and mapped
                      rubrics from case input
                    </Label>
                    <select
                      name="toolPhrasing"
                      value={form.toolPhrasing}
                      onChange={handleChange}
                      className="block w-full border rounded-md px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>Maybe</option>
                      <option>No</option>
                    </select>
                  </div>
                  {errors.toolPhrasing && (
                    <p className="text-xs text-red-500">
                      {errors.toolPhrasing}
                    </p>
                  )}

                  <div>
                    <Label>
                      Tool that recommends which repertory to use based on the
                      case
                    </Label>
                    <select
                      name="toolRepertory"
                      value={form.toolRepertory}
                      onChange={handleChange}
                      className="block w-full border rounded-md px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>Maybe</option>
                      <option>No</option>
                    </select>
                  </div>
                  {errors.toolRepertory && (
                    <p className="text-xs text-red-500">
                      {errors.toolRepertory}
                    </p>
                  )}

                  <div>
                    <Label>
                      Tool that suggests differential diagnoses and differential
                      remedy choices
                    </Label>
                    <select
                      name="toolDifferential"
                      value={form.toolDifferential}
                      onChange={handleChange}
                      className="block w-full border rounded-md px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>Maybe</option>
                      <option>No</option>
                    </select>
                  </div>
                  {errors.toolDifferential && (
                    <p className="text-xs text-red-500">
                      {errors.toolDifferential}
                    </p>
                  )}

                  <div>
                    <Label>
                      {language === "Eng"
                        ? "If you could name some features in the new Homeosetu app, what would it be"
                        : "“यदि आप नए Homeosetu ऐप में कुछ फीचर नाम दे सकते हैं, तो वे क्या होंगे?”"}
                    </Label>
                    <Textarea
                      name="featureSuggestions"
                      rows={3}
                      value={form.featureSuggestions}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.featureSuggestions && (
                    <p className="text-xs text-red-500">
                      {errors.featureSuggestions}
                    </p>
                  )}

                  <div>
                    <Label>
                      {language === "Eng"
                        ? "Which payment model would you prefer for a homeopathy app that meets your needs?"
                        : "किस भुगतान मॉडल को आप प्राथमिकता देंगे? (कोई एक चुनें)"}
                    </Label>
                    <select
                      name="paymentModel"
                      value={form.paymentModel}
                      onChange={handleChange}
                      className="block w-full border rounded-md px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option>Free with ads; paid upgrade to remove ads</option>
                      <option>Freemium (basic free; paid premium features)</option>
                      <option>One-time purchase (lifetime license)</option>
                      <option>Subscription (monthly)</option>
                      <option>Subscription (annual)</option>
                      <option>I would not pay for this app</option>
                      <option>Not sure / need more info</option>
                    </select>
                  </div>
                  {errors.paymentModel && (
                    <p className="text-xs text-red-500">
                      {errors.paymentModel}
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-lg mb-4">
                    {language === "Eng"
                      ? "7. Collaboration & early access"
                      : "7. सहयोग और प्रारंभिक पहुँच (एक विकल्प)"}
                  </p>
                  <div className="ml-4 space-y-4 mb-8">
                    <div>
                      <Label>
                        {language === "Eng"
                          ? "Would you like early access to test Homeosetu?"
                          : "क्या आप Homeosetu के लिए early access टेस्ट करना चाहेंगे?"}
                      </Label>
                      <select
                        name="earlyAccess"
                        value={form.earlyAccess}
                        onChange={handleChange}
                        className="block w-full border rounded-md px-3 py-2"
                      >
                        <option value="">Select</option>
                        <option>Yes</option>
                        <option>Maybe</option>
                        <option>No</option>
                      </select>
                    </div>
                    {errors.earlyAccess && (
                      <p className="text-xs text-red-500">
                        {errors.earlyAccess}
                      </p>
                    )}
                    <div>
                      <Label>
                        {language === "Eng"
                          ? "May we contact you for collaboration?"
                          : "क्या हम आपको गहरे फीडबैक या सहयोग के लिए संपर्क कर सकते हैं?"}
                      </Label>
                      <select
                        name="contactPermission"
                        value={form.contactPermission}
                        onChange={handleChange}
                        className="block w-full border rounded-md px-3 py-2"
                      >
                        <option value="">Select</option>
                        <option>Yes</option>
                        <option>Maybe</option>
                        <option>No</option>
                      </select>
                    </div>
                    {errors.contactPermission && (
                      <p className="text-xs text-red-500">
                        {errors.contactPermission}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    name="consent1"
                    checked={form.consent1}
                    onChange={handleCheckChange}
                  />
                  <span>
                    {language === "Eng"
                      ? "I agree to be contacted by Homeosetu Software LLP by phone, email or text for product updates and testing; I have read the Privacy Policy and Terms of Service."
                      : "मैं Homeosetu Software LLP द्वारा फोन, ईमेल या टेक्स्ट के माध्यम से उत्पाद अपडेट और परीक्षण के लिए संपर्क किए जाने के लिए सहमत हूँ; मैंने प्रायवेसी पॉलिसी और टर्म्स ऑफ़ सर्विस पढ़ लिए हैं."}
                  </span>
                </div>
                {errors.consent1 && (
                  <p className="text-xs text-red-500">{errors.consent1}</p>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="consent2"
                    checked={form.consent2}
                    onChange={handleCheckChange}
                  />
                  <span>
                    {language === "Eng"
                      ? "I agree to receive occasional product announcements and educational content."
                      : "मैं कभी-कभार उत्पाद घोषणाएं और शैक्षिक सामग्री प्राप्त करने के लिए सहमत हूँ."}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="consent3"
                    checked={form.consent3}
                    onChange={handleCheckChange}
                  />
                  <span>
                    {language === "Eng" ? "By submitting this survey, you allow Homeosetu to use youranswers (without your name or contact details) to improveour app and share insights—like stats or anonymous quotes—onsocial media or in presentations." : "•	इस सर्वेक्षण को जमा करके, आप Homeosetu को अपनी जवाबों का उपयोग करने की अनुमति देते हैं (आपका नाम या संपर्क विवरण शामिल किए बिना) ताकि हमारे ऐप को बेहतर बनाया जा सके और आंकड़े या गुमनाम उद्धरण जैसे जानकारी सोशल मीडिया या प्रस्तुतियों में साझा की जा सकें।"}
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4"
                >
                  {isSubmitting ? "Submitting..." : "ENTER SURVEY AND JOIN THE WAITLIST"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
