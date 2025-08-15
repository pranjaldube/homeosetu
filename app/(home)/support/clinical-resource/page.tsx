"use client";

import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ThreeSectionPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const clinicalRef = useRef<HTMLDivElement>(null);
  const observationRef = useRef<HTMLDivElement>(null);
  const analogyRef = useRef<HTMLDivElement>(null);
  const casetakingRef = useRef<HTMLDivElement>(null);
  const [filePath, setFilePath] = useState("");

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const storeEmailInDB = async () => {
    setIsLoading(true);
    const payload = {
      method: "POST",
      url: `/api/emailSchedule`,
      data: {
        name,
        email,
        filePath,
        phone: countryCode+" "+phone,
        sent: consent
      },
    };

    await axios(payload)
      .then((res) => {
        setIsLoading(false);
        if (res.data === "Already Subscribed") {
          toast.success(res.data);
          return;
        }
        toast.success("Your pdf is generated and mailed");
        setEmail("");
        setName("");
        setFilePath("");
        setPhone("");
        setCountryCode("+91")
        setConsent(false)
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Internal server error: storeEmailInDB", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Clinical Resources Section */}
      <section
        ref={clinicalRef}
        className="py-12 sm:py-20 px-4 sm:px-6 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
          Clinical Resources
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          A curated set of tools, guides, and references to assist clinical
          practitioners in delivering the best possible care.
        </p>
      </section>

      {/* Sticky-In-Section Navbar */}
      <section className="relative max-w-3xl mx-auto">
        {/* Navbar */}
        <nav className="sticky top-[32px] rounded bg-white shadow-md z-50">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 py-3 sm:py-4 text-base sm:text-lg font-medium">
            <li>
              <button
                onClick={() => scrollToSection(observationRef)}
                className="hover:text-blue-600 transition-colors"
              >
                Freedom from Prejudice
              </button>
            </li>
            {/* <li>
              <button
                onClick={() => scrollToSection(analogyRef)}
                className="hover:text-blue-600 transition-colors"
              >
                Analogy
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(casetakingRef)}
                className="hover:text-blue-600 transition-colors"
              >
                Casetaking
              </button>
            </li> */}
          </ul>
        </nav>

        {/* Sections inside same container so navbar sticks in place */}
        <div>
          {/* <div className="text-4xl my-8 font-bold mb-8">
            <p className="flex items-center justify-center">Coming Soon</p>
          </div> */}
          <section
            ref={observationRef}
            className="py-12 sm:py-20 px-4 sm:px-6 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Freedom from Prejudice
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              A Homeopath always gets prejudiced in Case taking through
              reference of a single repertory / MM / Method. Our free PDF shall
              give you a structured overview for breaking your prejudices.
            </p>
          </section>

          {/* <section
            ref={analogyRef}
            className="py-12 sm:py-20 px-4 sm:px-6 text-center bg-gray-100"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Analogy
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Analogy is the process of finding similarities between two
              different things to explain or understand them better. It helps in
              simplifying complex ideas.
            </p>
          </section>

          <section
            ref={casetakingRef}
            className="py-12 sm:py-20 px-4 sm:px-6 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Casetaking
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Casetaking is a detailed process of gathering comprehensive
              information about a case to ensure accurate diagnosis and
              effective solutions.
            </p>
          </section> */}

          {/* Email Section */}
          <section className="py-12 sm:py-20 px-4 sm:px-6 text-center bg-white border-t max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Stay Updated
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
              Enter your email to receive updates and insights directly in your
              inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                storeEmailInDB();
              }}
              className="flex justify-center gap-2 sm:gap-3 items-center flex-wrap"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56 text-sm sm:text-base"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56 text-sm sm:text-base"
                required
              />
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                placeholder="+91"
                className="w-16 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone Number"
                className="px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56 text-sm sm:text-base"
                required
              />
              <select
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                className="px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56 text-sm sm:text-base"
                required
              >
                <option value="">Choose your PDF</option>
                <option value="Get freedom from Prejudices - Toolkit for homeopaths.pdf">
                  Freedom from Prejudice
                </option>
                {/* <option value="pitch.pdf">Pitch</option> */}
              </select>
              <div className="flex items-start gap-2 mt-3 px-24">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                />
                <label
                  htmlFor="consent"
                  className="text-xs sm:text-sm text-gray-600 leading-snug"
                >
                  By providing your information you agree to allow{" "}
                  <strong>Homeosetu Software LLP</strong>, and/or its partners
                  to contact you by mail, phone, email, or text even if the
                  phone number is present on a state or national Do Not Call
                  list. By submitting this information you agree to our
                  <a href="/privacy-policy" className="text-blue-600 underline">
                    {" "}
                    Privacy Policy{" "}
                  </a>
                  and
                  <a href="/tnc" className="text-blue-600 underline">
                    {" "}
                    Terms of Service
                  </a>
                  . If you wish to unsubscribe later on, you can do so by
                  informing us.
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-5 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base`}
              >
                {isLoading ? "Sending..." : "GET FREE PDF"}
              </button>
            </form>
            <div></div>
          </section>
        </div>
      </section>
    </div>
  );
}
