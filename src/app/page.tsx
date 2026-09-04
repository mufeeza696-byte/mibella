"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Gift,
  Flower2,
  ShoppingBag,
  Heart,
  Check,
  Feather,
  Calendar,
  Truck,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SIGNATURE_COLLECTIONS } from "@/lib/catalog-data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col selection:bg-[#E8D8C3] selection:text-[#6B1E2D]">
      <Navbar />

      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E0CEB7]">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#E8D8C3]/50 to-[#F8F1E7]/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center">
          <Badge
            variant="cream"
            className="mb-6 px-4 py-1 text-[11px] tracking-[0.25em] font-semibold border-[#E0CEB7]"
          >
            ARTISANAL CUSTOM GIFTING ATELIER
          </Badge>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.15] tracking-tight text-[#6B1E2D] mb-6">
            Curate Moments That <br />
            <span className="italic font-serif font-light text-[#822436]">
              Bloom Forever
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8C3A4B] leading-relaxed mb-10 font-sans">
            Mibella creates personalized gift boxes and handcrafted floral bouquets for life&apos;s
            most cherished milestones. From keepsake vessels to handwritten wax seals, every detail is
            assembled with genuine devotion.
          </p>

          {/* DEDICATED SEPARATE BUTTONS FOR GIFT BOX & BOUQUET */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Link href="/catalog?tab=box" className="w-full sm:w-1/2">
              <Button
                size="lg"
                className="w-full text-xs sm:text-sm tracking-widest uppercase font-semibold py-6 shadow-md"
              >
                <Gift className="h-4 w-4 mr-1 text-[#C5A880]" />
                Customize Gift Box
              </Button>
            </Link>

            <Link href="/catalog?tab=bouquet" className="w-full sm:w-1/2">
              <Button
                variant="secondary"
                size="lg"
                className="w-full text-xs sm:text-sm tracking-widest uppercase font-semibold py-6 border-[#6B1E2D]/40 bg-[#F8F1E7] hover:bg-[#E8D8C3]"
              >
                <Flower2 className="h-4 w-4 mr-1 text-[#6B1E2D]" />
                Customize Bouquet
              </Button>
            </Link>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#8C3A4B]">
            <span>Looking for ready-to-ship gifts or standalone treats?</span>
            <Link
              href="/catalog?tab=browse"
              className="font-semibold text-[#6B1E2D] hover:text-[#822436] underline underline-offset-4 flex items-center gap-1"
            >
              Browse Complete Catalog <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* DUAL ATELIER FEATURE CARDS */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            {/* Box Studio Card */}
            <Link href="/catalog?tab=box" className="block group">
              <div className="p-6 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] hover:border-[#6B1E2D] hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="gold" className="text-[10px]">
                      KEEPSAKE BOXES
                    </Badge>
                    <span className="text-xs font-semibold text-[#8C3A4B]">From Rs. 2,800</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-full bg-[#E8D8C3] text-[#6B1E2D]">
                      <Gift className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#6B1E2D] group-hover:text-[#822436] transition-colors">
                      Bespoke Gift Box Atelier
                    </h3>
                  </div>
                  <p className="text-xs text-[#8C3A4B] leading-relaxed mb-4">
                    Choose magnetic luxury boxes, Kundan jhumkas, handmade crochet keepsakes,
                    scented soy candles, and personalized keepsake photo prints.
                  </p>
                </div>
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#6B1E2D] group-hover:translate-x-1 transition-transform">
                  Start Box Customization →
                </span>
              </div>
            </Link>

            {/* Bouquet Studio Card */}
            <Link href="/catalog?tab=bouquet" className="block group">
              <div className="p-6 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] hover:border-[#6B1E2D] hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-[10px]">
                      FRESH FLORALS
                    </Badge>
                    <span className="text-xs font-semibold text-[#8C3A4B]">From Rs. 3,900</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-full bg-[#E8D8C3] text-[#6B1E2D]">
                      <Flower2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#6B1E2D] group-hover:text-[#822436] transition-colors">
                      Artisanal Bouquet Studio
                    </h3>
                  </div>
                  <p className="text-xs text-[#8C3A4B] leading-relaxed mb-4">
                    Hand-select imported Ecuadorian roses, Dutch garden peonies, frosted Korean
                    paper, luxury velvet ties, and gourmet Ferrero Rocher toppers.
                  </p>
                </div>
                <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#6B1E2D] group-hover:translate-x-1 transition-transform">
                  Start Bouquet Customization →
                </span>
              </div>
            </Link>
          </div>

          {/* Value Assurances */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#E0CEB7]/80 text-left">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F1E7]/80 border border-[#E0CEB7]/70">
              <Sparkles className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">100% Bespoke</p>
                <p className="text-xs text-[#8C3A4B]">Customized to your taste</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F1E7]/80 border border-[#E0CEB7]/70">
              <Feather className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">Wax-Sealed Note</p>
                <p className="text-xs text-[#8C3A4B]">Handwritten calligraphy</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F1E7]/80 border border-[#E0CEB7]/70">
              <Calendar className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">Scheduled Delivery</p>
                <p className="text-xs text-[#8C3A4B]">Choose date & delivery slot</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F1E7]/80 border border-[#E0CEB7]/70">
              <Truck className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">All Pakistan</p>
                <p className="text-xs text-[#8C3A4B]">Express door delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CURATED SIGNATURE HIGHLIGHTS (SPOTLIGHT)                   */}
      {/* ============================================================ */}
      <section id="collections" className="py-20 bg-[#E8D8C3]/30 border-b border-[#E0CEB7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <Badge variant="cream" className="mb-2 tracking-widest text-[10px]">
                SIGNATURE EDITIONS
              </Badge>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#6B1E2D]">
                Curated Gift Collections
              </h2>
              <p className="text-[#8C3A4B] mt-2 text-sm sm:text-base">
                Thoughtfully assembled by our master florists and curators for immediate express
                delivery across Pakistan.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Link href="/catalog?tab=box">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs uppercase tracking-wider font-semibold"
                >
                  Customize Box
                </Button>
              </Link>
              <Link href="/catalog?tab=bouquet">
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs uppercase tracking-wider font-semibold"
                >
                  Customize Bouquet
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SIGNATURE_COLLECTIONS.slice(0, 3).map((col) => (
              <Card
                key={col.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-[#E0CEB7] flex flex-col justify-between bg-[#F8F1E7]/80"
              >
                <div>
                  <div
                    className={`h-48 bg-gradient-to-br ${col.bgAccent} p-6 flex flex-col justify-between border-b border-[#E0CEB7]/60`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="text-[10px]">
                        {col.tag}
                      </Badge>
                      <button
                        aria-label="Favorite"
                        className="p-1.5 rounded-full bg-white/60 hover:bg-white text-[#6B1E2D] transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                        {col.type}
                      </span>
                      <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
                        {col.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#8C3A4B]">
                        {col.itemsCount}
                      </span>
                      <span className="font-serif text-xl font-bold text-[#6B1E2D]">
                        Rs. {col.pricePkr.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#E0CEB7]/60">
                      {col.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#8C3A4B]">
                          <Check className="h-3.5 w-3.5 text-[#6B1E2D]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <div className="p-6 pt-0">
                  <Link href="/catalog?tab=browse" className="block w-full">
                    <Button
                      variant="secondary"
                      className="w-full text-xs font-semibold uppercase tracking-wider"
                    >
                      Personalize & Order
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Dedicated Catalog Teaser Banner */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#6B1E2D] to-[#822436] text-[#F8F1E7] border border-[#501521] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="gold" className="text-[10px] tracking-widest uppercase">
                THE COMPLETE ATELIER
              </Badge>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                Looking for More Varieties, Jewelry & Keepsakes?
              </h3>
              <p className="text-xs sm:text-sm text-[#E8D8C3] max-w-xl">
                Browse our dedicated catalog page featuring all 25+ artisanal items, Kundan jewelry,
                handmade crochet gajras, scented candles, and luxury bouquets with live search and
                category filters.
              </p>
            </div>
            <Link href="/catalog?tab=browse" className="shrink-0 w-full md:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full md:w-auto text-xs font-semibold uppercase tracking-widest px-8 py-6 shadow-md hover:bg-white"
              >
                Explore Full Catalog (25+ Luxuries) →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. THE 3-STEP UNBOXING RITUAL                                */}
      {/* ============================================================ */}
      <section id="unboxing" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="gold" className="mb-2 tracking-widest text-[10px]">
            THE MIBELLA DIFFERENCE
          </Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#6B1E2D]">
            The Unboxing Ritual
          </h2>
          <p className="text-[#8C3A4B] mt-3 text-sm sm:text-base">
            Gifting is an emotion. Every step of our unboxing experience is crafted to make the
            recipient feel deeply cherished.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F8F1E7] p-8 rounded-3xl border border-[#E0CEB7] relative space-y-4">
            <span className="font-serif text-4xl font-bold text-[#E8D8C3] block">01</span>
            <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              Artisanal Curation
            </h3>
            <p className="text-xs text-[#8C3A4B] leading-relaxed">
              Select premium vessels, hand-blended candles, fine confectionery, and freshly
              conditioned stems. No mass-market fillers.
            </p>
          </div>

          <div className="bg-[#F8F1E7] p-8 rounded-3xl border border-[#E0CEB7] relative space-y-4">
            <span className="font-serif text-4xl font-bold text-[#E8D8C3] block">02</span>
            <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              Wax Seal & Calligraphy
            </h3>
            <p className="text-xs text-[#8C3A4B] leading-relaxed">
              Your words written by hand with calligraphy ink on archival cotton paper, stamped with
              our signature golden wax crest.
            </p>
          </div>

          <div className="bg-[#F8F1E7] p-8 rounded-3xl border border-[#E0CEB7] relative space-y-4">
            <span className="font-serif text-4xl font-bold text-[#E8D8C3] block">03</span>
            <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              Scheduled Hand-Delivery
            </h3>
            <p className="text-xs text-[#8C3A4B] leading-relaxed">
              Delivered on the exact date you choose with white-glove courier handling across
              Pakistan, ensuring pristine presentation upon arrival.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CUSTOMER SENTIMENTS & SOCIAL PROOF                         */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#6B1E2D] text-[#F8F1E7] border-t border-[#501521]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-1 text-[#C5A880] mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-normal italic max-w-3xl mx-auto leading-snug">
            &ldquo;The unboxing in Lahore was breathtaking. Opening the custom hatbox with the real
            wax seal and smelling the fresh rose candle made it the most memorable gift I have ever
            received.&rdquo;
          </h2>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#EBDDC8] font-semibold">
            Mahnoor K. • Lahore & Islamabad
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs tracking-widest uppercase text-[#EBDDC8]/70">
            <span>DAWN LIFESTYLE</span>
            <span>•</span>
            <span>SUNDAY TIMES</span>
            <span>•</span>
            <span>GRAZIA PAKISTAN</span>
            <span>•</span>
            <span>HELLO! ATELIER</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
