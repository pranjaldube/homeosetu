"use client"

import React, { useState } from 'react';

const Navbar = () => {
  const [speakersOpen, setSpeakersOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="mx-4 lg:mx-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="font-medium text-base">
              HomeoSetu Logo
            </a>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {/* Speakers Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 text-gray-700"
                onClick={() => setSpeakersOpen(!speakersOpen)}
              >
                Speakers
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {speakersOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Sub Item
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Sub Item
                  </a>
                </div>
              )}
            </div>

            <a href="/about" className="text-gray-700">
              About Us
            </a>

            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 text-gray-700"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                Categories
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {categoriesOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Sub Item
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Sub Item
                  </a>
                </div>
              )}
            </div>

            <a href="/blog" className="text-gray-700">
              Blog
            </a>

            <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default async function Hero() {
  return (
    <div className="relative bg-gray-100">
      <Navbar />
      <div className="mx-4 lg:mx-8 pb-16">
        <div className="relative pt-8">
          {/* Discount Badge */}
          <div className="flex items-center gap-2">
            <span role="img" aria-label="bulb" className="text-2xl">💡</span>
            <span className="bg-red-400 text-white px-4 py-1 rounded-full text-sm">20% OFF</span>
            <span className="text-red-400 font-medium text-sm">LEARN FROM TODAY</span>
          </div>

          {/* Main Content */}
          <div className="mt-8 flex justify-between items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl lg:text-5xl font-bold text-purple-900 leading-tight mb-4">
                Bridge between Academic & Clinical Knowledge
              </h1>
              <p className="text-gray-600 text-base mb-8">
                get to learn from experienced homeopaths by enrolling for courses and webinars from the comfort of your home.
              </p>
            </div>

            {/* Right side decorative elements */}
            <div className="relative">
              <div className="flex items-center justify-center">
                {/* Graduate Cap */}
                <div className="absolute top-0 right-0">
                  <div className="w-16 h-16 bg-purple-600 rounded-lg rotate-12"></div>
                </div>
                
                {/* Central circular element */}
                <div className="w-48 h-48 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-40 h-40 bg-purple-200 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-purple-300 rounded-full"></div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute bottom-0 right-0">
                  <div className="w-12 h-12 bg-purple-400 rounded-lg -rotate-12"></div>
                </div>
                <div className="absolute top-12 left-0">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
