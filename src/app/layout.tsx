import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "bengali"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bazar Dor",
    template: "%s | Bazar Dor",
  },
  description: "Daily market prices and product updates.",
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
      <body className="flex min-h-full flex-col bg-base-100 text-base-content">
        <Navbar />
        <Marquee />

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}