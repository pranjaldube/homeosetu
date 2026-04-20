import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { Announcements } from "@/components/announcements"; // Adjust this path if necessary
import { Navbar } from "../(components)/navbar";
import { Footer } from "../(components)/footer";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Homeosetu",

  description:
    "Empowering you with knowledge on effective and safe homeopathy usage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <Announcements />
      <div className="flex flex-col min-h-screen mt-2">
        <div className="flex-grow pt-2">
          <ConfettiProvider />
          <ToastProvider />
          <div className="relative">
            <Navbar />
            <Separator />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
