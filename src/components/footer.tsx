"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Truck, Heart } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#E8D8C3] text-[#6B1E2D] pt-16 pb-12 border-t border-[#E0CEB7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.2em] font-medium block">
                MIBELLA
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C3A4B] font-semibold block -mt-1">
                Custom Boxes & Bouquets
              </span>
            </Link>
            <p className="text-xs text-[#8C3A4B] leading-relaxed max-w-sm">
              Pakistan&apos;s premier atelier of bespoke luxury gift boxes and handcrafted floral arrangements. Every piece is curated with fresh stems, wax calligraphy, and heartfelt passion.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold bg-[#F8F1E7] px-3 py-1 rounded-full border border-[#E0CEB7]">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                Supabase Cloud Connected
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4 text-[#6B1E2D]">
              The Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8C3A4B]">
              <li>
                <Link href="/#customizer-section" className="hover:text-[#6B1E2D] transition-colors">
                  Customize Gift Box
                </Link>
              </li>
              <li>
                <Link href="/#customizer-section" className="hover:text-[#6B1E2D] transition-colors">
                  Customize Bouquet
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#6B1E2D] transition-colors font-medium">
                  Curated Catalog & Gifts
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#6B1E2D] transition-colors">
                  Corporate & Event Gifting
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4 text-[#6B1E2D]">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8C3A4B]">
              <li>
                <Link href="/faq" className="hover:text-[#6B1E2D] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#6B1E2D] transition-colors">
                  Delivery & Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#6B1E2D] transition-colors">
                  Returns & Cancellations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#6B1E2D] transition-colors">
                  Contact Customer Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4 text-[#6B1E2D]">
              Legal & Privacy
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8C3A4B]">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#6B1E2D] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-[#6B1E2D] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#6B1E2D] transition-colors">
                  Refund & Quality Guarantee
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-[#6B1E2D] transition-colors">
                  Account Sign In / Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-[#E0CEB7]/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h5 className="font-serif text-base font-semibold text-[#6B1E2D]">
              Join the MIBELLA Circle
            </h5>
            <p className="text-xs text-[#8C3A4B] mt-0.5">
              Receive private previews of seasonal floral harvests and special gifting offers across Pakistan.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-4 py-2 rounded-full border border-emerald-300">
              <Check className="h-4 w-4" />
              <span>Thank you for joining our private gifting circle!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white/80 text-xs w-full sm:w-64"
              />
              <Button type="submit" size="sm" className="shrink-0 text-xs font-semibold uppercase tracking-wider">
                Subscribe
              </Button>
            </form>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#E0CEB7]/70 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C3A4B] gap-3">
          <p>© {new Date().getFullYear()} MIBELLA Atelier. All rights reserved. Handcrafted in Pakistan.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:underline">Terms</Link>
            <span>•</span>
            <Link href="/shipping-policy" className="hover:underline">Shipping</Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:underline">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
