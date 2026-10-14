import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import Footer from "./components/Footer";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "bengali"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bazar Dor | বাজার দর",
    template: "%s | Bazar Dor",
  },
  description:
    "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারমূল্য, মূল্য পরিবর্তন এবং বাজারের সর্বশেষ আপডেট এক নজরে দেখুন।",
  applicationName: "Bazar Dor",
  keywords: [
    "Bazar Dor",
    "বাজার দর",
    "দৈনিক বাজারদর",
    "পণ্যের দাম",
    "বাংলাদেশের বাজার",
    "নিত্যপ্রয়োজনীয় পণ্যের দাম",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Bazar Dor | বাজার দর",
    description:
      "নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর ও মূল্য পরিবর্তন এক নজরে দেখুন।",
    siteName: "Bazar Dor",
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="flex min-h-screen flex-col bg-base-200 text-base-content font-sans">
        <Navbar />

        <Marquee />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
