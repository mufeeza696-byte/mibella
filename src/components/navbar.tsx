"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag, Search, User, Gift, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#6B1E2D] text-[#F8F1E7] px-4 py-2 text-xs font-medium tracking-widest text-center uppercase flex items-center justify-center gap-2 border-b border-[#501521]">
        <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
        <span>Complimentary Handwritten Calligraphy & Wax-Sealed Card on orders over Rs. 5,000</span>
        <span className="hidden md:inline">• Same-Day Hand Delivery in Lahore, Karachi & Islamabad</span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#F3E7D3]/95 backdrop-blur-md border-b border-[#E0CEB7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold">
            <Link
              href="/#customizer-section"
              className="hover:text-[#822436] transition-colors flex items-center gap-1.5"
            >
              <Gift className="h-3.5 w-3.5" />
              Customize Box
            </Link>
            <Link
              href="/#customizer-section"
              className="hover:text-[#822436] transition-colors flex items-center gap-1.5"
            >
              <Flower2 className="h-3.5 w-3.5" />
              Customize Bouquet
            </Link>
            <Link href="/catalog" className="hover:text-[#822436] transition-colors font-bold text-[#6B1E2D]">
              Catalog
            </Link>
            <Link href="/faq" className="hover:text-[#822436] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-[#822436] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Central Logo */}
          <div className="text-center">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-medium text-[#6B1E2D] group-hover:text-[#822436] transition-colors">
                MIBELLA
              </span>
              <span className="block text-[9px] uppercase tracking-[0.4em] text-[#8C3A4B] font-sans -mt-1 font-semibold">
                Custom Boxes & Bouquets
              </span>
            </Link>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-semibold text-[#8C3A4B] bg-[#E8D8C3]/50 px-3 py-1 rounded-full border border-[#E0CEB7]">
              PKR (Rs.)
            </span>

            <Link
              href="/auth"
              aria-label="User Account"
              className="p-2 rounded-full text-[#6B1E2D] hover:bg-[#E8D8C3] transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link href="/#customizer-section">
              <Button variant="default" size="sm" className="relative flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Bag</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Quick Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around py-2.5 px-3 border-t border-[#E0CEB7]/60 text-[11px] uppercase tracking-wider font-semibold bg-[#F8F1E7]/70 overflow-x-auto gap-4 scrollbar-none">
          <Link href="/#customizer-section" className="hover:text-[#822436] shrink-0">
            Custom Box
          </Link>
          <Link href="/#customizer-section" className="hover:text-[#822436] shrink-0">
            Bouquet
          </Link>
          <Link href="/catalog" className="text-[#6B1E2D] font-bold shrink-0">
            Catalog
          </Link>
          <Link href="/faq" className="text-[#8C3A4B] shrink-0">
            FAQ
          </Link>
          <Link href="/contact" className="text-[#8C3A4B] shrink-0">
            Contact
          </Link>
        </div>
      </header>
    </>
  );
}
