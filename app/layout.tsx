import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mr. Kent's Salon — Premium Grooming",
  description:
    "Discover the beauty in you. Book your next haircut, styling, or grooming session at Mr. Kent's Salon.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-surface text-foreground font-sans antialiased">
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
