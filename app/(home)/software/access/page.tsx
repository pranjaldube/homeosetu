"use client";

import { useRouter } from "next/navigation";

export default function AccessPage() {
  const router = useRouter();

  const trialBenefits = [
    "Try Homeosetu WebApp free for 9 days",
    "Repertories embedded with HomeoSetu Lens - MM / Prescriptive Pointers from Stalwarts like Clarke, Hempel, Hering, Pulte.",
    "Homeosetu Intelligence Clinic Assistant",
    "“No credit card required”",
    "Explore 5 repertories and clinical tools",
  ];

  const benefits = [
    "Launch Offer Price INR.499/month (IND) $25/Month (GLOBAL)",
    "Subscribe monthly",
    "Repertories embedded with HomeoSetu Lens - MM / Prescriptive Pointers from Stalwarts like Clarke, Hempel, Hering, Pulte.",
    "Homeosetu Intelligence Clinic Assistant",
    "Enter Your Notes in Each Mind Section Rubric",
    "“Trusted by practicing homeopaths”",
    "“All features + ongoing updates”",
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] py-12 flex flex-col items-center justify-center bg-slate-50 px-4 relative">
      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-4xl animate-in fade-in zoom-in-95 duration-200">
        {/* Free Trial Card */}
        <div className="w-full max-w-sm h-[620px] rounded-[20px] bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col">
          <div className="px-6 pt-8 pb-6 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-4 ring-8 ring-emerald-50">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
              Free Trial
            </h2>
            {/* <p className="text-sm text-slate-500 leading-relaxed px-2">
              Try out Kent Repertory and explore the basic features before
              upgrading.
            </p> */}
          </div>

          <div className="p-6 bg-white flex-1 flex flex-col">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              What you get
            </h3>
            <ul className="space-y-3.5 mb-8 flex-1">
              {trialBenefits.map((benefit) => (
                <li className="flex items-start text-[14px] text-slate-600">
                  <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 mr-3">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => router.push("/software/kent-repertory")}
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-[15px] shadow-[0_4px_14px_0_rgb(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Free Trial
            </button>
          </div>
        </div>

        {/* Premium Popup Card */}
        <div className="w-full max-w-sm h-[620px] rounded-[20px] bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col">
          <div className="px-6 pt-8 pb-6 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 mb-4 ring-8 ring-indigo-50">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
              Access Required
            </h2>
            {/* <p className="text-sm text-slate-500 leading-relaxed px-2">
              Your subscription has ended. Upgrade now to restore access to all
              features.
            </p> */}
          </div>

          <div className="p-6 bg-white flex-1 flex flex-col">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              What you get
            </h3>
            <ul className="space-y-3.5 mb-8 flex-1">
              {benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-[14px] text-slate-600"
                >
                  <div className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => router.push("/checkout?type=kent-access")}
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-[15px] shadow-[0_4px_14px_0_rgb(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Pay for Access
            </button>

            {/* <p className="mt-4 text-center text-[12px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
              <svg
                className="w-3.5 h-3.5 text-slate-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              Secure, 1-click payment
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
