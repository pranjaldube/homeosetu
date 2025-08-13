"use client";

import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ThreeSectionPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const clinicalRef = useRef<HTMLDivElement>(null);
  const observationRef = useRef<HTMLDivElement>(null);
  const analogyRef = useRef<HTMLDivElement>(null);
  const casetakingRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const storeEmailInDB = async () => {
    setIsLoading(true)
    const payload = {
        method: 'POST',
        url: `/api/emailSchedule`,
        data:{
            name, 
            email
        }
    }

    await axios(payload).then((res)=>{
        setIsLoading(false)
        if(res.data === "Already Subscribed"){
            toast.success(res.data)
            return;
        }
        toast.success('Subscribed Successfully')
        setEmail('')
        setName('')
    }).catch((err)=>{
        setIsLoading(false)
        console.error('Internal server error: storeEmailInDB',err)
    })
  }

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
                Observation
              </button>
            </li>
            <li>
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
            </li>
          </ul>
        </nav>

        {/* Sections inside same container so navbar sticks in place */}
        <div>
          <section
            ref={observationRef}
            className="py-12 sm:py-20 px-4 sm:px-6 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Observation
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Observation involves carefully examining and noting details about
              a subject, situation, or phenomenon. It is the foundation of
              accurate analysis and understanding.
            </p>
          </section>

          <section
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
          </section>

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
               storeEmailInDB()
              }}
              className="flex justify-center gap-2 sm:gap-3 items-center flex-wrap"
            >
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter your name"
                className="px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56 text-sm sm:text-base"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 sm:w-56 text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-5 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base`}
              >
                {isLoading ? "Sending..." : "Subscribe"}
              </button>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}