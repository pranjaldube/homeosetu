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
                FAQ
            </h1>
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-semibold mt-8 mb-4">Account & Registration</h1>

                    <div className="space-y-6 text-lg px-8">
                        <h1 className="text-1xl font-semibold mt-8 mb-0">1. How do I create an account?</h1>
                        <div className="px-8">
                            <p>a. Visit <a href="https://www.homeosetu.com" target="_blank" className="text-blue-500 underline">www.homeosetu.com</a></p>
                            <p>b. Click <span className="text-1xl font-semibold">Explore courses or login (top right option in the main page)</span>, enter your email address (Use Google Account) Or Enter your email id and password</p>
                            <p>c. It will open up the dashboard</p>
                        </div>
                        <h1 className="text-1xl font-bold mb-2">2. I forgot my password. What should I do?</h1>
                        <div className="px-8">
                            <p>a. If you have logged in through google , then choose the correct email id and it will allow access.</p>
                            <p>b .If you have manually submitted password at the time of sign up on the login page, click <span className="text-1xl font-semibold">Forgot Password</span>, enter your email, and follow the reset link sent to you.</p>
                            <p>c .An OTP will be generated and sent to your email address, please enter those in the box seen</p>
                            <p>d. Reset your password.</p>
                        </div>
                    </div>

                    <h1 className="text-4xl font-semibold mt-8 mb-4">Browsing Courses</h1>

                    <div className="space-y-6 text-lg px-8">
                        <h1 className="text-1xl font-semibold mt-8 mb-0">3. How do I create an view the courses?
                        </h1>
                        <div className="px-8">
                            <p>a. The dashboard shows the courses that you are currently viewing or those that are completed.</p>
                            <p>b. If you are a new user (Please pe patient while it loads) - Click on Browse Courses option
                            </p>
                            <p>c. Click on the desired Course and Purchase </p>
                            <p>d. Enter the details at the time of billing and the course will be available on your dashboard.
                            </p>
                        </div>
                        <h1 className="text-1xl font-bold mb-2">4. Do I get certificate on completing the courses?</h1>
                        <div className="px-8">
                            <p>a. Currently, Certificates for individual videos are not available</p>
                        </div>
                    </div>

                    <h1 className="text-4xl font-semibold mt-8 mb-4">Payment related</h1>

                    <div className="space-y-6 text-lg px-8">
                        <h1 className="text-1xl font-semibold mt-8 mb-0">5. Which payment methods do you accept?
                        </h1>
                        <div className="px-8">
                            <p>a. FOR INDIAN USERS - We accept major credit/debit cards, UPI, and net banking.</p>
                            <p>b. FOR INTERNATIONAL USERS – Payment through credit cards on the links provided besides each video.
                            </p>
                        </div>
                        <h1 className="text-1xl font-bold mb-2">6. My payment was deducted but I did not get invoice?
                        </h1>
                        <div className="px-8">
                            <p>a. Please send a screenshot of your date of payment and transaction details to <a href="https://mailto:homeosetu@gmail.com" target="_blank" className="text-blue-500 underline">homeosetu@gmail.com</a> and we will respond soon.</p>
                        </div>

                        <h1 className="text-1xl font-bold mb-2">7. My payment was deducted but I did not get access to video?
                        </h1>
                        <div className="px-8">
                            <p>a. Please send a screenshot of your date of payment and transaction details to <a href="https://mailto:homeosetu@gmail.com" target="_blank" className="text-blue-500 underline">homeosetu@gmail.com</a> and we will respond soon.</p>
                        </div>

                        <h1 className="text-1xl font-bold mb-2">8. What is your refund policy?
                        </h1>
                        <div className="px-8">
                            <p>a. Kindly refer our refund and Return policy mentioned on homepage.
                            </p>
                        </div>
                    </div>

                    <h1 className="text-4xl font-semibold mt-8 mb-4">Technical & Support
                    </h1>

                    <div className="space-y-6 text-lg px-8">
                        <h1 className="text-1xl font-semibold mt-8 mb-0">9. What are the technical requirements?
                        </h1>
                        <div className="px-8">
                            <p>a. A modern browser (Chrome, Firefox, Safari, Edge), internet speed ≥3 Mbps, and up-to-date video codecs.
                            </p>
                        </div>
                        <h1 className="text-1xl font-bold mb-2">10. How can I get help?
                        </h1>
                        <div className="px-8">
                            <p>a. For Any Payment related issue or technical assistance, email <a href="https://mailto:homeosetu@gmail.com" target="_blank" className="text-blue-500 underline">homeosetu@gmail.com</a> or kindly send a WhatsApp to <span className="text-blue-500 underline">+91 9975461833</span> with screenshot of details. We will get back to you with solutions as early as possible.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
