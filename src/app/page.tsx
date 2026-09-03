"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Calendar,
  Gift,
  Feather,
  ChevronRight,
  Star,
  Check,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  Clock,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Sample Curated Box Items for Interactive Preview
interface CustomItem {
  id: string;
  name: string;
  category: string;
  price: number;
  tag: string;
  description: string;
}

const SAMPLE_ITEMS: CustomItem[] = [
  {
    id: "item-1",
    name: "Artisan Belgian Praline Truffles",
    category: "Sweets",
    price: 18,
    tag: "Gourmet",
    description: "Handcrafted dark chocolate ganache infused with sea salt caramel.",
  },
  {
    id: "item-2",
    name: "French Rose & Santal Soy Candle",
    category: "Fragrance",
    price: 26,
    tag: "Best Seller",
    description: "Hand-poured 100% natural botanical wax with wooden wick.",
  },
  {
    id: "item-3",
    name: "Mulberry Silk Sleep Mask",
    category: "Keepsake",
    price: 32,
    tag: "Luxury",
    description: "22-Momme pure organic silk with custom monogram embroidery.",
  },
  {
    id: "item-4",
    name: "Matcha & Vanilla Botanical Tea Tin",
    category: "Drinkware",
    price: 16,
    tag: "Organic",
    description: "Ceremonial grade Japanese green tea blend with dried rosebuds.",
  },
  {
    id: "item-5",
    name: "Handcrafted Ceramic Ribbed Mug",
    category: "Keepsake",
    price: 22,
    tag: "Artisanal",
    description: "Kiln-fired stoneware finished in warm speckled ivory glaze.",
  },
  {
    id: "item-6",
    name: "Miniature Preserved Rose Dome",
    category: "Botanical",
    price: 34,
    tag: "Everlasting",
    description: "Real Ecuadorian rose preserved to stay fresh for up to 3 years.",
  },
];

const BOX_STYLES = [
  {
    id: "box-blush",
    name: "Atelier Blush Keepsake Chest",
    size: "Medium (Fits 4-5 items)",
    price: 24,
    colorHex: "#E8D8C3",
    badge: "Most Popular",
  },
  {
    id: "box-noir",
    name: "Burgundy Velvet Prestige Box",
    size: "Large (Fits 6-7 items)",
    price: 32,
    colorHex: "#6B1E2D",
    badge: "Signature",
  },
  {
    id: "box-cream",
    name: "Ivory Linen Round Hatbox",
    size: "Grande (Fits 5-6 items)",
    price: 28,
    colorHex: "#F8F1E7",
    badge: "Deluxe",
  },
];

const SIGNATURE_COLLECTIONS = [
  {
    id: "col-1",
    title: "The Velvet Rose & Santal Suite",
    type: "Bespoke Gift Box",
    price: 115,
    tag: "Valentine's & Anniversaries",
    itemsCount: "5 Curated Luxuries",
    includes: ["Preserved Crimson Rose", "French Santal Candle", "Belgian Truffles", "Silk Ribbons"],
    bgAccent: "from-[#6B1E2D]/10 to-[#E8D8C3]/30",
  },
  {
    id: "col-2",
    title: "The Parisian Morning Blossom",
    type: "Handcrafted Bouquet",
    price: 98,
    tag: "Fresh Florals",
    itemsCount: "18 Artisanal Stems",
    includes: ["Garden Peonies", "Blush Ranunculus", "Eucalyptus", "Silk Satin Wrap"],
    bgAccent: "from-[#F8F1E7] to-[#E8D8C3]/60",
  },
  {
    id: "col-3",
    title: "Golden Hour Spa & Serenity",
    type: "Wellness Gift Box",
    price: 135,
    tag: "Self-Care & Birthday",
    itemsCount: "6 Artisanal Keepsakes",
    includes: ["Mulberry Silk Mask", "Botanical Bath Soak", "Soy Candle", "Gold Tea Strainer"],
    bgAccent: "from-[#E8D8C3]/40 to-[#F3E7D3]",
  },
];

export default function HomePage() {
  // Customizer preview state
  const [selectedBox, setSelectedBox] = useState(BOX_STYLES[0]);
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "item-1",
    "item-2",
  ]);
  const [cardMessage, setCardMessage] = useState(
    "Wishing you endless joy and blooming memories on your special day."
  );
  const [cardRecipient, setCardRecipient] = useState("Isabella");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      if (selectedItems.length < 5) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  const calculatedTotal =
    selectedBox.price +
    selectedItems.reduce((acc, currId) => {
      const found = SAMPLE_ITEMS.find((i) => i.id === currId);
      return acc + (found ? found.price : 0);
    }, 0);

  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D]">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#6B1E2D] text-[#F8F1E7] px-4 py-2.5 text-xs font-medium tracking-widest text-center uppercase flex items-center justify-center gap-2 border-b border-[#501521]">
        <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
        <span>Complimentary Handwritten Calligraphy & Wax-Sealed Card on orders over $75</span>
        <span className="hidden md:inline">• Same-Day Hand Delivery Available</span>
      </div>

      {/* Main Luxury Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#F3E7D3]/90 backdrop-blur-md border-b border-[#E0CEB7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold">
            <a href="#customizer" className="hover:text-[#822436] transition-colors">
              Custom Box Builder
            </a>
            <a href="#bouquets" className="hover:text-[#822436] transition-colors">
              Bouquets
            </a>
            <a href="#collections" className="hover:text-[#822436] transition-colors">
              Curated Gifts
            </a>
            <a href="#unboxing" className="hover:text-[#822436] transition-colors">
              The Unboxing Ritual
            </a>
          </nav>

          {/* Central Luxury Brand Emblem */}
          <div className="text-center">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-medium text-[#6B1E2D] group-hover:text-[#822436] transition-colors">
                MIBELLA
              </span>
              <span className="block text-[9px] uppercase tracking-[0.4em] text-[#8C3A4B] font-sans -mt-1 font-semibold">
                Atelier de Cadeaux
              </span>
            </Link>
          </div>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search items"
              className="p-2 rounded-full text-[#6B1E2D] hover:bg-[#E8D8C3] transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label="User Account"
              className="p-2 rounded-full text-[#6B1E2D] hover:bg-[#E8D8C3] transition-colors"
              onClick={() => setIsOrderModalOpen(true)}
            >
              <User className="h-5 w-5" />
            </button>
            <Button
              variant="default"
              size="sm"
              className="relative flex items-center gap-2"
              onClick={() => setIsOrderModalOpen(true)}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-[#C5A880] text-[#501521] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {selectedItems.length + 1}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E0CEB7]">
        {/* Subtle Decorative Background Accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#E8D8C3]/50 to-[#F8F1E7]/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center">
          <Badge
            variant="cream"
            className="mb-6 px-4 py-1 text-[11px] tracking-[0.25em] font-semibold border-[#E0CEB7]"
          >
            ARTISANAL CUSTOM GIFTING
          </Badge>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.15] tracking-tight text-[#6B1E2D] mb-6">
            Curate Moments That <br />
            <span className="italic font-serif font-light text-[#822436]">
              Bloom Forever
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8C3A4B] leading-relaxed mb-10 font-sans">
            Bespoke gift boxes and handcrafted botanical arrangements, tailored to your exact sentiments. Choose your keepsake box, hand-select every luxury indulgence, and seal it with calligraphy and wax.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-sm tracking-widest uppercase font-semibold"
              onClick={() => {
                const el = document.getElementById("customizer");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Gift className="h-4 w-4" />
              Build Your Custom Box
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-sm tracking-widest uppercase font-semibold border-[#E0CEB7]"
              onClick={() => {
                const el = document.getElementById("collections");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Ready-To-Ship
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Value Assurances */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#E0CEB7]/80 text-left">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F1E7]/70 border border-[#E0CEB7]/60">
              <Sparkles className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">100% Bespoke</p>
                <p className="text-xs text-[#8C3A4B]">Customize every single item</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F1E7]/70 border border-[#E0CEB7]/60">
              <Feather className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">Wax-Sealed Cards</p>
                <p className="text-xs text-[#8C3A4B]">Handwritten calligraphy notes</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F1E7]/70 border border-[#E0CEB7]/60">
              <Calendar className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">Scheduled Delivery</p>
                <p className="text-xs text-[#8C3A4B]">Choose your exact delivery date</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F8F1E7]/70 border border-[#E0CEB7]/60">
              <ShieldCheck className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">White Glove Care</p>
                <p className="text-xs text-[#8C3A4B]">Delivered with luxury handling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Custom Box Builder Live Demonstration */}
      <section id="customizer" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="gold" className="mb-3 tracking-widest text-[10px]">
            INTERACTIVE EXPERIENCE
          </Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#6B1E2D]">
            The Custom Box Atelier
          </h2>
          <p className="mt-4 text-[#8C3A4B] text-base leading-relaxed">
            Experience our signature gifting customizer. Select your box style, hand-pick each artisan treat, and write your heartfelt card.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Configuration Tabs */}
          <div className="lg:col-span-7 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm">
            <Tabs defaultValue="step-box" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 w-full">
                <TabsTrigger value="step-box" className="text-xs sm:text-sm">
                  1. Box Vessel
                </TabsTrigger>
                <TabsTrigger value="step-items" className="text-xs sm:text-sm">
                  2. Curate Items ({selectedItems.length}/5)
                </TabsTrigger>
                <TabsTrigger value="step-card" className="text-xs sm:text-sm">
                  3. Wax Card
                </TabsTrigger>
              </TabsList>

              {/* Step 1: Vessel Selection */}
              <TabsContent value="step-box" className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                    Choose Your Keepsake Box
                  </h3>
                  <span className="text-xs text-[#8C3A4B]">Includes premium magnetic lid & satin ribbon</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {BOX_STYLES.map((box) => {
                    const isSelected = selectedBox.id === box.id;
                    return (
                      <div
                        key={box.id}
                        onClick={() => setSelectedBox(box)}
                        className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative ${
                          isSelected
                            ? "border-[#6B1E2D] bg-[#E8D8C3]/50 shadow-md ring-1 ring-[#6B1E2D]"
                            : "border-[#E0CEB7] bg-[#F8F1E7] hover:border-[#6B1E2D]/40"
                        }`}
                      >
                        {box.badge && (
                          <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider bg-[#6B1E2D] text-[#F8F1E7] px-2 py-0.5 rounded-full">
                            {box.badge}
                          </span>
                        )}
                        <div
                          className="w-10 h-10 rounded-full border border-black/10 mb-3 shadow-inner"
                          style={{ backgroundColor: box.colorHex }}
                        />
                        <h4 className="font-serif font-semibold text-sm text-[#6B1E2D]">
                          {box.name}
                        </h4>
                        <p className="text-xs text-[#8C3A4B] mt-1">{box.size}</p>
                        <p className="text-sm font-semibold text-[#6B1E2D] mt-3">
                          +${box.price}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Step 2: Curate Items */}
              <TabsContent value="step-items" className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                      Select Luxury Keepsakes
                    </h3>
                    <p className="text-xs text-[#8C3A4B]">
                      Select up to 5 items to fill your chosen box.
                    </p>
                  </div>
                  <Badge variant="cream" className="font-semibold">
                    {selectedItems.length} of 5 selected
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {SAMPLE_ITEMS.map((item) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                          isSelected
                            ? "border-[#6B1E2D] bg-[#E8D8C3]/60 shadow-xs"
                            : "border-[#E0CEB7] bg-[#F8F1E7] hover:bg-[#E8D8C3]/30"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C3A4B]">
                              {item.category}
                            </span>
                            <span className="text-[9px] bg-[#C5A880]/30 text-[#501521] px-1.5 py-0.2 rounded font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <p className="font-serif font-medium text-sm text-[#6B1E2D]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[#8C3A4B] line-clamp-2">
                            {item.description}
                          </p>
                          <p className="text-xs font-bold text-[#6B1E2D] pt-1">
                            +${item.price}
                          </p>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? "bg-[#6B1E2D] text-[#F8F1E7]"
                              : "border border-[#E0CEB7] text-transparent"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Step 3: Calligraphy & Card */}
              <TabsContent value="step-card" className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                  Handwritten Calligraphy Card
                </h3>
                <p className="text-xs text-[#8C3A4B]">
                  Each note is inked by hand on heavy 350gsm cotton cardstock and sealed with gold wax.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                      Recipient Name
                    </label>
                    <Input
                      value={cardRecipient}
                      onChange={(e) => setCardRecipient(e.target.value)}
                      placeholder="e.g. Eleanor, Mom, My Love"
                      className="bg-white/60"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                      Your Personal Message
                    </label>
                    <textarea
                      rows={4}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      className="w-full rounded-2xl border border-[#E0CEB7] bg-white/60 p-4 text-sm text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                      placeholder="Write your sentiments here..."
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex items-center gap-3">
                    <Feather className="h-5 w-5 text-[#6B1E2D]" />
                    <span className="text-xs text-[#6B1E2D]">
                      Gold wax seal finish & botanical dried lavender sprig included complimentary.
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Live Custom Box Summary & Unboxing Preview */}
          <div className="lg:col-span-5 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#E0CEB7]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                  LIVE CURATION SUMMARY
                </span>
                <h3 className="font-serif text-xl font-medium text-[#6B1E2D]">
                  Your Bespoke Box
                </h3>
              </div>
              <Badge variant="gold" className="text-xs font-bold">
                ${calculatedTotal} USD
              </Badge>
            </div>

            {/* Vessel Selected */}
            <div className="py-4 border-b border-[#E0CEB7]/70">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8C3A4B]">Selected Vessel:</span>
                <span className="font-semibold text-[#6B1E2D]">{selectedBox.name}</span>
              </div>
              <p className="text-[11px] text-[#8C3A4B] mt-0.5">{selectedBox.size}</p>
            </div>

            {/* Selected Items List */}
            <div className="py-4 border-b border-[#E0CEB7]/70 space-y-2">
              <span className="text-xs font-semibold text-[#8C3A4B] block">
                Selected Treasures ({selectedItems.length}):
              </span>
              {selectedItems.length === 0 ? (
                <p className="text-xs italic text-[#8C3A4B]">No treats added yet. Select items from Step 2.</p>
              ) : (
                selectedItems.map((id) => {
                  const item = SAMPLE_ITEMS.find((i) => i.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex items-center justify-between text-xs">
                      <span className="text-[#6B1E2D] truncate pr-2">• {item.name}</span>
                      <span className="text-[#8C3A4B] shrink-0 font-medium">+${item.price}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Card Preview */}
            <div className="py-4 border-b border-[#E0CEB7]/70 bg-[#E8D8C3]/30 p-3 rounded-xl my-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B1E2D] block mb-1">
                Wax-Sealed Card to {cardRecipient || "Recipient"}
              </span>
              <p className="font-serif italic text-xs text-[#8C3A4B] line-clamp-2">
                &ldquo;{cardMessage}&rdquo;
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2 space-y-3">
              <Button
                size="lg"
                className="w-full text-xs font-semibold uppercase tracking-widest"
                onClick={() => setIsOrderModalOpen(true)}
              >
                Add Custom Box to Cart • ${calculatedTotal}
              </Button>
              <p className="text-center text-[11px] text-[#8C3A4B]">
                Free gift box packaging, silk tie, & complimentary message card included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Ready-To-Ship Curated Collections */}
      <section id="collections" className="py-20 bg-[#E8D8C3]/30 border-y border-[#E0CEB7]">
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
                Thoughtfully assembled by our master florists and curators for immediate gifting.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0 self-start md:self-auto text-xs uppercase tracking-wider font-semibold"
            >
              View All Collections <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SIGNATURE_COLLECTIONS.map((col) => (
              <Card
                key={col.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-[#E0CEB7] flex flex-col justify-between"
              >
                <div>
                  <div className={`h-48 bg-gradient-to-br ${col.bgAccent} p-6 flex flex-col justify-between border-b border-[#E0CEB7]/60`}>
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="text-[10px]">
                        {col.tag}
                      </Badge>
                      <button aria-label="Favorite" className="p-1.5 rounded-full bg-white/60 hover:bg-white text-[#6B1E2D] transition-colors">
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
                        ${col.price}
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
                  <Button
                    variant="secondary"
                    className="w-full text-xs font-semibold uppercase tracking-wider"
                    onClick={() => setIsOrderModalOpen(true)}
                  >
                    Personalize & Order
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The 3-Step Unboxing Ritual */}
      <section id="unboxing" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="gold" className="mb-2 tracking-widest text-[10px]">
            THE MIBELLA DIFFERENCE
          </Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#6B1E2D]">
            The Unboxing Ritual
          </h2>
          <p className="text-[#8C3A4B] mt-3 text-sm sm:text-base">
            Gifting is an emotion. Every step of our unboxing experience is crafted to make the recipient feel deeply cherished.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F8F1E7] p-8 rounded-3xl border border-[#E0CEB7] relative space-y-4">
            <span className="font-serif text-4xl font-bold text-[#E8D8C3] block">
              01
            </span>
            <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              Artisanal Curation
            </h3>
            <p className="text-xs text-[#8C3A4B] leading-relaxed">
              Select premium vessels, hand-blended candles, fine confectionery, and freshly conditioned stems. No mass-market fillers.
            </p>
          </div>

          <div className="bg-[#F8F1E7] p-8 rounded-3xl border border-[#E0CEB7] relative space-y-4">
            <span className="font-serif text-4xl font-bold text-[#E8D8C3] block">
              02
            </span>
            <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              Wax Seal & Calligraphy
            </h3>
            <p className="text-xs text-[#8C3A4B] leading-relaxed">
              Your words written by hand with calligraphy ink on archival cotton paper, stamped with our signature golden wax crest.
            </p>
          </div>

          <div className="bg-[#F8F1E7] p-8 rounded-3xl border border-[#E0CEB7] relative space-y-4">
            <span className="font-serif text-4xl font-bold text-[#E8D8C3] block">
              03
            </span>
            <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              Scheduled Hand-Delivery
            </h3>
            <p className="text-xs text-[#8C3A4B] leading-relaxed">
              Delivered on the exact date you choose with white-glove courier handling, ensuring pristine presentation upon unboxing.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Sentiments & Social Proof */}
      <section className="py-20 bg-[#6B1E2D] text-[#F8F1E7] border-t border-[#501521]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-1 text-[#C5A880] mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-normal italic max-w-3xl mx-auto leading-snug">
            &ldquo;The unboxing was breathtaking. Opening the custom hatbox with the real wax seal and smelling the fresh rose candle made it the most memorable gift I have ever received.&rdquo;
          </h2>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#EBDDC8] font-semibold">
            Camille S. • Paris & New York
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs tracking-widest uppercase text-[#EBDDC8]/70">
            <span>VOGUE GIFT GUIDE</span>
            <span>•</span>
            <span>HARPER&apos;S BAZAAR</span>
            <span>•</span>
            <span>ARCHITECTURAL DIGEST</span>
            <span>•</span>
            <span>ELLE ATELIER</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#E8D8C3] text-[#6B1E2D] pt-16 pb-12 border-t border-[#E0CEB7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-3xl tracking-[0.2em] font-medium block">
              MIBELLA
            </span>
            <p className="text-xs text-[#8C3A4B] leading-relaxed">
              Atelier of bespoke gift boxes and handcrafted floral arrangements. Designed for heartfelt connections.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold bg-[#F8F1E7] px-3 py-1 rounded-full border border-[#E0CEB7]">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                Supabase Backend Ready
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4">
              The Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#8C3A4B]">
              <li><a href="#customizer" className="hover:text-[#6B1E2D] transition-colors">Custom Gift Boxes</a></li>
              <li><a href="#bouquets" className="hover:text-[#6B1E2D] transition-colors">Fresh Floral Bouquets</a></li>
              <li><a href="#collections" className="hover:text-[#6B1E2D] transition-colors">Anniversary Suites</a></li>
              <li><a href="#collections" className="hover:text-[#6B1E2D] transition-colors">Corporate Gifting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider mb-4">
              Gifting Care
            </h4>
            <ul className="space-y-2 text-xs text-[#8C3A4B]">
              <li><a href="#" className="hover:text-[#6B1E2D] transition-colors">Delivery Date Calendar</a></li>
              <li><a href="#" className="hover:text-[#6B1E2D] transition-colors">Custom Message Inking</a></li>
              <li><a href="#" className="hover:text-[#6B1E2D] transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-[#6B1E2D] transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider">
              Join the MIBELLA Circle
            </h4>
            <p className="text-xs text-[#8C3A4B]">
              Receive private access to seasonal floral editions and gifting inspirations.
            </p>
            <div className="flex items-center gap-2">
              <Input placeholder="Enter your email" className="bg-white/80 text-xs" />
              <Button size="sm" className="shrink-0 text-xs font-semibold uppercase">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-[#E0CEB7]/70 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C3A4B]">
          <p>© {new Date().getFullYear()} MIBELLA Atelier. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-serif italic">Crafted with Next.js, Tailwind CSS, TanStack Query & Supabase.</p>
        </div>
      </footer>

      {/* Cart & Checkout Preview Dialog */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Your MIBELLA Bag</DialogTitle>
            <DialogDescription>
              Review your customized box and select delivery preferences.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] space-y-2">
              <div className="flex justify-between items-center text-sm font-serif font-semibold">
                <span>{selectedBox.name}</span>
                <span>${calculatedTotal} USD</span>
              </div>
              <p className="text-xs text-[#8C3A4B]">{selectedItems.length} curated treats included</p>
              <p className="text-xs italic text-[#8C3A4B] border-t border-[#E0CEB7] pt-2">
                Card note: &ldquo;{cardMessage}&rdquo;
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B]">
                Scheduled Delivery Date
              </label>
              <Input type="date" className="bg-white/70" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B]">
                Gift Recipient Address
              </label>
              <Input placeholder="Full shipping address" className="bg-white/70" />
            </div>

            <Button
              className="w-full text-xs font-semibold uppercase tracking-widest mt-4"
              size="lg"
              onClick={() => alert("Order submitted to cart! Connected to TanStack Query & Supabase.")}
            >
              Proceed to Gifting Checkout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
