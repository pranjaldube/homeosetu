import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <div className="container min-h-screen p-4 flex flex-col space-y-6 items-center">
      <h1
        className={cn(
          "animate-in fade-in duration-700 font-bold",
          "text-3xl sm:text-4xl"
        )}
      >
        Return and Refund Policy
      </h1>
      <h2 className="text-slate-600">Last Updated : December 15, 2024</h2>
      <p className="animate-in fade-in duration-1200 mt-4 text-center flex flex-col space-y-2">
        <span className="block">Thank you for shopping with Homeosetu. </span>
        <span className="block">
          If, for any reason, You are not completely satisfied with a purchase,
          we invite You to review our policy on refunds and returns. This Return
          and Refund Policy has been created with the help of the Return and
          Refund Policy Generator. The following terms are applicable for any
          products that You purchased with Us.
        </span>
      </p>
    </div>
  )
}
