import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <div className="container min-h-screen p-4 flex flex-col space-y-6 items-center">
      <h1
        className={cn(
          "animate-in fade-in duration-700 font-bold",
          "text-4xl sm:text-5xl"
        )}
      >
        Return and Refund Policy
      </h1>
      <h2 className="text-slate-600">Last Updated : December 15, 2024</h2>
      <p className="animate-in fade-in duration-1200 mt-4 text-center flex flex-col space-y-4">
        <span className="block">Thank you for shopping with Homeosetu. </span>
        <span className="block">
          We do not offer any refund or cancellations on the the purchased
          Goods. If, for any reason, You are not completely satisfied with
          purchased Goods, please contact Us at homeosetu [at] gmail [dot] com
        </span>
        <Separator />
        <span className="max-w-max text-slate-600">
          For the purposes of this Return and Refund Policy :-
          <br></br>
          <br></br>
          <b>Company</b>
          (referred to as either “the Company”, “We”, “Us” or “Our” in this
          Agreement) refers to Homeosetu Software LLP , B 701, Gold Crest 369
          CHS LTD, Opp New Viva College, Virar West, Maharashtra , Pin 401303.
          <br></br>
          <br></br>
          <b>Goods</b> refer to the items offered for sale on the Service.{" "}
          <br></br>
          <br></br>
          <b>Orders</b> mean a request by You to purchase Goods from Us.{" "}
          <br></br>
          <br></br>
          <b>Service</b> refers to the Website.
          <br></br>
          <br></br>
          <b>Website</b> refers to and accessible from https://www.homeosetu.com{" "}
          <br></br>
          <br></br>
          <b>You</b> means the individual accessing or using the Service, or the
          company, or other legal entity on behalf of which such individual is
          accessing or using the Service, as applicable.
        </span>
      </p>
    </div>
  )
}
