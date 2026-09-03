import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIBELLA — Bespoke Gift Boxes & Handcrafted Floral Bouquets",
  description:
    "Curate moments that bloom forever. Personalize luxury gift boxes and artisanal floral arrangements with custom notes and scheduled delivery.",
  keywords: [
    "gift boxes",
    "custom bouquets",
    "personalized gifts",
    "luxury flowers",
    "MIBELLA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] font-sans antialiased selection:bg-[#6B1E2D] selection:text-[#F8F1E7]">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
