"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <div className="bg-gray-100">
      <div className="mx-4 lg:mx-8 pb-16 ">
        <div className="relative pl-16">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {/* Discount Badge */}
              <div className="flex items-center gap-2">
                <span role="img" aria-label="bulb" className="text-2xl">
                  💡
                </span>
                <span className="bg-red-400 text-white px-4 py-1 rounded-full text-sm">
                  20% OFF
                </span>
                <span className="text-red-400 font-medium text-sm">
                  LEARN FROM TODAY
                </span>
              </div>

              {/* Main Content */}
              <div className="mt-8 flex justify-between items-start">
                <div className="max-w-xl">
                  <h1 className="text-4xl lg:text-5xl font-bold text-purple-900 leading-tight mb-4">
                    Bridge between Academic & Clinical Knowledge
                  </h1>
                  <p className="text-gray-600 text-base mb-8">
                    get to learn from experienced homeopaths by enrolling for
                    courses and webinars from the comfort of your home.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side decorative elements */}
            <div className="relative">
              <Image src="/hero-courses.svg" alt="" width="500" height="100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
