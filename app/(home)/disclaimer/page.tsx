"use client";

export default function Disclaimer() {

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6 text-lg">
          <h2 className="flex justify-center text-4xl font-semibold mt-8 mb-4">Disclaimer</h2>
          <p>
           All content shared on our website <a href="https://www.homeosetu.com" target="_blank" className="text-blue-500 underline">www.homeosetu.com</a> —including clinical insights, case discussions, and educational perspectives—is offered for informational and learning purposes only. It is not a substitute for personalized medical advice or consultation with a qualified Homeopath, especially when dealing with specific health concerns
          </p>

          <p>
           The cases presented by our contributor’s stem from their individual clinical journeys. These are shared to foster learning and reflection, not to claim definitive cures. The interpretations and ideas expressed are those of the respective authors, and Homeosetu Software LLP does not assume responsibility for their accuracy or outcomes.
          </p>

          <p>
           We encourage thoughtful engagement with the material, but any reliance on the information provided is at your own discretion. For precise diagnosis and treatment, always consult a licensed medical professional or certified healthcare practitioner.
          </p>

          <p>
           At Homeosetu, we’re committed to empowering practitioners and learners—responsibly, ethically, and with clarity.
          </p>
        </div>
      </div>
    </div>
  );
}
