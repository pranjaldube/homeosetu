import { Button } from "@/components/ui/button";

export default function Mentorship() {
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to Homeosetu Shishya Margdarshan
          </h2>
          <p className="text-gray-600 mb-4 text-base sm:text-lg">
            If you&apos;re an <strong>Intern/Homeopathic Beginner</strong> or{" "}
            <strong>Professional</strong> &amp; you need help in any of your
            cases, join our mentorship program -{" "}
            <strong>Shishya Margdarshan</strong> &amp; Dr. Alpesh Oza will guide
            you.
          </p>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            After Payment WhatsApp{" "}
            <span className="font-semibold">+91 9975461833</span>
            {" "}for connecting with detailed case taking with Dr. Alpesh Oza.
          </p>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row gap-4">
            <Button className="w-full sm:w-auto">
              Consult for Acute case Rs.253 + GST
            </Button>
            <Button className="w-full sm:w-auto">
              Consult for Chronic case Rs.1271 + GST
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="/ShisyaMaghDarshan.jpeg"
            alt="Shishya Margdarshan"
            className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
