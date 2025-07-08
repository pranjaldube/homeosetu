import { Rocket, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SoftwarePage() {
  return (
    <div className="min-h-[80vh] relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>

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

          {/* <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Get Notified</h2>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Mail className="h-4 w-4 mr-2" />
                Notify Me
              </Button>
            </div>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
              <p className="text-gray-600">Advanced insights for your practice</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">AI Integration</h3>
              <p className="text-gray-600">Powered by cutting-edge AI technology</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface for all users</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
} 