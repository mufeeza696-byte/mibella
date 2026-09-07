"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  User,
  Gift,
  Flower2,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { fetchStoreSettings, StoreSettings, DEFAULT_STORE_SETTINGS } from "@/lib/products-storage";

export function Navbar() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const profileRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  useEffect(() => {
    // 1. Initial user check
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    }
    loadUser();

    // 2. Load Store Settings for dynamic announcement
    async function loadSettings() {
      const s = await fetchStoreSettings();
      setStoreSettings(s);
    }
    loadSettings();

    // 3. Real-time auth listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    // 4. Click outside handler to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsProfileOpen(false);
  };

  // Derive user display initials and name
  const userName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.email?.split("@")[0] ||
    "Client";

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      {storeSettings.announcement_banner && (
        <div className="bg-[#6B1E2D] text-[#F8F1E7] px-4 py-2 text-xs font-medium tracking-wider text-center flex items-center justify-center gap-2 border-b border-[#501521]">
          <Sparkles className="h-3.5 w-3.5 text-[#C5A880] shrink-0" />
          <span>{storeSettings.announcement_banner}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#F3E7D3]/95 backdrop-blur-md border-b border-[#E0CEB7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold">
            <Link
              href="/catalog?tab=box"
              className="hover:text-[#822436] transition-colors flex items-center gap-1.5"
            >
              <Gift className="h-3.5 w-3.5" />
              Customize Box
            </Link>
            <Link
              href="/catalog?tab=bouquet"
              className="hover:text-[#822436] transition-colors flex items-center gap-1.5"
            >
              <Flower2 className="h-3.5 w-3.5" />
              Customize Bouquet
            </Link>
            <Link
              href="/catalog"
              className="hover:text-[#822436] transition-colors font-bold text-[#6B1E2D]"
            >
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

            {/* USER PROFILE / AUTH SECTION */}
            {currentUser ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#E8D8C3]/60 transition-all border border-[#E0CEB7] bg-white/70 cursor-pointer"
                  aria-label="User profile menu"
                >
                  <div className="h-7 w-7 rounded-full bg-[#6B1E2D] text-[#F8F1E7] font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                    {userInitial}
                  </div>
                  <span className="hidden md:inline text-xs font-semibold text-[#6B1E2D] max-w-[100px] truncate pr-1">
                    {userName}
                  </span>
                  <ChevronDown className="h-3 w-3 text-[#8C3A4B] hidden sm:inline" />
                </button>

                {/* Profile Details Dropdown Card */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#F8F1E7] border border-[#E0CEB7] shadow-xl p-4 space-y-3 z-50 animate-fadeIn">
                    <div className="flex items-center gap-3 pb-3 border-b border-[#E0CEB7]/70">
                      <div className="h-10 w-10 rounded-full bg-[#6B1E2D] text-[#F8F1E7] font-serif font-bold text-base flex items-center justify-center shadow-xs">
                        {userInitial}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-serif font-semibold text-sm text-[#6B1E2D] truncate">
                          {userName}
                        </h4>
                        <p className="text-[11px] text-[#8C3A4B] truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-medium py-1">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Verified MIBELLA Member</span>
                      </div>

                      <Link
                        href="/checkout"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 text-[#6B1E2D] hover:bg-[#E8D8C3]/60 p-2 rounded-xl transition-colors"
                      >
                        <Package className="h-4 w-4 text-[#8C3A4B]" />
                        <span>Checkout / Active Bag</span>
                      </Link>

                      <Link
                        href="/auth"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 text-[#6B1E2D] hover:bg-[#E8D8C3]/60 p-2 rounded-xl transition-colors"
                      >
                        <User className="h-4 w-4 text-[#8C3A4B]" />
                        <span>Account & Security</span>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-[#E0CEB7]/70">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#8C3A4B] hover:text-[#6B1E2D] py-2 rounded-xl hover:bg-[#E8D8C3]/50 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                aria-label="User Account"
                className="flex items-center gap-1.5 p-2 rounded-full text-[#6B1E2D] hover:bg-[#E8D8C3] transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:inline text-xs font-semibold">Sign In</span>
              </Link>
            )}

            {/* Bag Button leading to /checkout */}
            <Link href="/checkout">
              <Button variant="default" size="sm" className="relative flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Bag</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Quick Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around py-2.5 px-3 border-t border-[#E0CEB7]/60 text-[11px] uppercase tracking-wider font-semibold bg-[#F8F1E7]/70 overflow-x-auto gap-4 scrollbar-none">
          <Link href="/catalog?tab=box" className="hover:text-[#822436] shrink-0">
            Custom Box
          </Link>
          <Link href="/catalog?tab=bouquet" className="hover:text-[#822436] shrink-0">
            Bouquet
          </Link>
          <Link href="/catalog" className="text-[#6B1E2D] font-bold shrink-0">
            Catalog
          </Link>
          <Link href="/checkout" className="text-[#6B1E2D] font-bold shrink-0">
            Checkout
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
