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
  Flower2,
  Ribbon,
  Truck,
  MapPin,
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
import { Footer } from "@/components/footer";

// ==========================================
// 1. DATA MODELS FOR GIFT BOXES (PKR)
// ==========================================
interface CustomBoxItem {
  id: string;
  name: string;
  category: string;
  pricePkr: number;
  tag: string;
  description: string;
}

const BOX_STYLES = [
  {
    id: "box-blush",
    name: "Atelier Blush Keepsake Chest",
    size: "Medium (Fits 4-5 items)",
    pricePkr: 2800,
    colorHex: "#E8D8C3",
    badge: "Most Popular",
  },
  {
    id: "box-noir",
    name: "Burgundy Velvet Prestige Box",
    size: "Large (Fits 6-7 items)",
    pricePkr: 3800,
    colorHex: "#6B1E2D",
    badge: "Signature",
  },
  {
    id: "box-cream",
    name: "Ivory Linen Round Hatbox",
    size: "Grande (Fits 5-6 items)",
    pricePkr: 3200,
    colorHex: "#F8F1E7",
    badge: "Deluxe",
  },
];

const SAMPLE_BOX_ITEMS: CustomBoxItem[] = [
  {
    id: "item-1",
    name: "Artisan Belgian Praline Truffles",
    category: "Sweets",
    pricePkr: 1850,
    tag: "Gourmet",
    description: "Handcrafted dark chocolate ganache infused with sea salt caramel.",
  },
  {
    id: "item-2",
    name: "French Rose & Santal Soy Candle",
    category: "Fragrance",
    pricePkr: 2600,
    tag: "Best Seller",
    description: "Hand-poured 100% natural botanical wax with wooden wick.",
  },
  {
    id: "item-3",
    name: "Mulberry Silk Sleep Mask",
    category: "Keepsake",
    pricePkr: 3200,
    tag: "Luxury",
    description: "22-Momme pure organic silk with custom monogram embroidery.",
  },
  {
    id: "item-4",
    name: "Matcha & Vanilla Botanical Tea Tin",
    category: "Drinkware",
    pricePkr: 1650,
    tag: "Organic",
    description: "Ceremonial grade Japanese green tea blend with dried rosebuds.",
  },
  {
    id: "item-5",
    name: "Handcrafted Ceramic Speckled Mug",
    category: "Keepsake",
    pricePkr: 2200,
    tag: "Artisanal",
    description: "Kiln-fired stoneware finished in warm speckled ivory glaze.",
  },
  {
    id: "item-6",
    name: "Miniature Preserved Rose Dome",
    category: "Botanical",
    pricePkr: 3900,
    tag: "Everlasting",
    description: "Real Ecuadorian rose preserved to stay fresh for up to 3 years.",
  },
  {
    id: "item-7",
    name: "Organic Lavender Bath Salts & Scrub",
    category: "Self-Care",
    pricePkr: 2100,
    tag: "Relaxation",
    description: "Infused with cold-pressed essential oils and Himalayan pink crystals.",
  },
  {
    id: "item-8",
    name: "Gold-Plated Heart Keepsake Keychain",
    category: "Accessories",
    pricePkr: 1450,
    tag: "Keepsake",
    description: "Polished brushed gold hardware with engraved floral emblem.",
  },
];

// ==========================================
// 2. DATA MODELS FOR BOUQUETS (PKR)
// ==========================================
interface FlowerStem {
  id: string;
  name: string;
  origin: string;
  stemsCount: string;
  pricePkr: number;
  colorTone: string;
}

const BOUQUET_FLOWERS: FlowerStem[] = [
  {
    id: "flower-1",
    name: "Imported Red Naomi Roses",
    origin: "Ecuadorian Stems",
    stemsCount: "12 Long Stems",
    pricePkr: 4800,
    colorTone: "Deep Crimson",
  },
  {
    id: "flower-2",
    name: "Garden Peonies & Ranunculus",
    origin: "Dutch Garden",
    stemsCount: "10 Premium Stems",
    pricePkr: 5600,
    colorTone: "Blush & Ivory",
  },
  {
    id: "flower-3",
    name: "Pure White Oriental Lilies",
    origin: "Fresh Cut Farm",
    stemsCount: "6 Fragrant Stems",
    pricePkr: 3900,
    colorTone: "Snow White",
  },
  {
    id: "flower-4",
    name: "Pastel Spring Tulips",
    origin: "Holland Stems",
    stemsCount: "15 Fresh Stems",
    pricePkr: 4500,
    colorTone: "Peach & Lilac",
  },
  {
    id: "flower-5",
    name: "Eucalyptus & Baby's Breath",
    origin: "Lush Filler",
    stemsCount: "Generous Bunch",
    pricePkr: 1600,
    colorTone: "Sage Green & White",
  },
];

const BOUQUET_WRAPPINGS = [
  {
    id: "wrap-1",
    name: "Korean Frosted Matte Paper",
    finish: "Waterproof luxury soft-touch paper",
    pricePkr: 850,
  },
  {
    id: "wrap-2",
    name: "Vintage French Kraft Wrap",
    finish: "Organic textured ribbed paper",
    pricePkr: 650,
  },
  {
    id: "wrap-3",
    name: "Burgundy Velvet Elegance Wrap",
    finish: "Ultra-rich double lined fabric finish",
    pricePkr: 950,
  },
];

const BOUQUET_RIBBONS = [
  { id: "rib-1", name: "Silk Satin Ribbon Tie", pricePkr: 450 },
  { id: "rib-2", name: "Heavy French Velvet Ribbon", pricePkr: 750 },
  { id: "rib-3", name: "Gold Foil Monogram Ribbon", pricePkr: 900 },
];

const BOUQUET_ADDONS = [
  { id: "add-1", name: "Box of 8 Ferrero Rocher", pricePkr: 1850, tag: "Sweets" },
  { id: "add-2", name: "Plush Cream Teddy Keepsake", pricePkr: 1450, tag: "Keepsake" },
  { id: "add-3", name: "Gold Acrylic 'Happy Birthday' Topper", pricePkr: 650, tag: "Accent" },
  { id: "add-4", name: "Mini French Botanical Mist (30ml)", pricePkr: 2200, tag: "Scent" },
];

// ==========================================
// 3. CURATED SIGNATURE COLLECTIONS (PKR)
// ==========================================
const SIGNATURE_COLLECTIONS = [
  {
    id: "col-1",
    title: "The Velvet Rose & Santal Suite",
    type: "Bespoke Gift Box",
    pricePkr: 14500,
    tag: "Valentine's & Anniversaries",
    itemsCount: "5 Curated Luxuries",
    includes: ["Preserved Crimson Rose", "French Santal Candle", "Belgian Truffles", "Silk Ribbons", "Calligraphy Card"],
    bgAccent: "from-[#6B1E2D]/15 to-[#E8D8C3]/40",
  },
  {
    id: "col-2",
    title: "The Parisian Morning Blossom",
    type: "Handcrafted Bouquet",
    pricePkr: 8200,
    tag: "Fresh Stems",
    itemsCount: "18 Artisanal Stems",
    includes: ["Garden Peonies", "Blush Ranunculus", "Eucalyptus", "Korean Frosted Wrap", "Satin Bow"],
    bgAccent: "from-[#F8F1E7] to-[#E8D8C3]/70",
  },
  {
    id: "col-3",
    title: "Golden Hour Spa & Serenity",
    type: "Wellness Gift Box",
    pricePkr: 12800,
    tag: "Self-Care & Birthday",
    itemsCount: "6 Artisanal Keepsakes",
    includes: ["Mulberry Silk Mask", "Botanical Bath Soak", "Soy Candle", "Gold Tea Strainer", "Ceramic Mug"],
    bgAccent: "from-[#E8D8C3]/50 to-[#F3E7D3]",
  },
  {
    id: "col-4",
    title: "Crimson Passion Grand Bouquet",
    type: "Handcrafted Bouquet",
    pricePkr: 9900,
    tag: "Signature Florals",
    itemsCount: "24 Long Stems",
    includes: ["24 Red Naomi Roses", "Baby's Breath Accent", "Burgundy Velvet Wrap", "Gold Crest Tag"],
    bgAccent: "from-[#6B1E2D]/20 to-[#F8F1E7]",
  },
  {
    id: "col-5",
    title: "The Ivory Hatbox & Truffle Hamper",
    type: "Bespoke Gift Box",
    pricePkr: 16500,
    tag: "Deluxe Luxury",
    itemsCount: "7 Curated Luxuries",
    includes: ["Ivory Linen Hatbox", "Belgian Truffles", "Silk Pillowcase", "Rose Candle", "Calligraphy Card"],
    bgAccent: "from-[#F8F1E7] to-[#E8D8C3]",
  },
  {
    id: "col-6",
    title: "Pastel Symphony Garden Bouquet",
    type: "Handcrafted Bouquet",
    pricePkr: 7800,
    tag: "Seasonal Fresh",
    itemsCount: "16 Stems",
    includes: ["White Oriental Lilies", "Pastel Dutch Tulips", "Seeded Eucalyptus", "Kraft Wrap"],
    bgAccent: "from-[#E8D8C3]/30 to-[#F8F1E7]",
  },
];

export default function HomePage() {
  // Mode selection: "box" or "bouquet"
  const [activeCustomizer, setActiveCustomizer] = useState<"box" | "bouquet">("box");

  // Box Customizer State
  const [selectedBox, setSelectedBox] = useState(BOX_STYLES[0]);
  const [selectedBoxItems, setSelectedBoxItems] = useState<string[]>([
    "item-1",
    "item-2",
  ]);
  const [cardMessage, setCardMessage] = useState(
    "Wishing you endless joy and blooming memories on your special day."
  );
  const [cardRecipient, setCardRecipient] = useState("Isabella");

  // Bouquet Customizer State
  const [selectedFlower, setSelectedFlower] = useState(BOUQUET_FLOWERS[0]);
  const [selectedWrap, setSelectedWrap] = useState(BOUQUET_WRAPPINGS[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(BOUQUET_RIBBONS[0]);
  const [selectedBouquetAddons, setSelectedBouquetAddons] = useState<string[]>([
    "add-1",
  ]);

  // Order & Cart Modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [scheduledDate, setScheduledDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  // Toggle Box items
  const toggleBoxItem = (id: string) => {
    if (selectedBoxItems.includes(id)) {
      setSelectedBoxItems(selectedBoxItems.filter((i) => i !== id));
    } else {
      if (selectedBoxItems.length < 5) {
        setSelectedBoxItems([...selectedBoxItems, id]);
      }
    }
  };

  // Toggle Bouquet addons
  const toggleBouquetAddon = (id: string) => {
    if (selectedBouquetAddons.includes(id)) {
      setSelectedBouquetAddons(selectedBouquetAddons.filter((i) => i !== id));
    } else {
      setSelectedBouquetAddons([...selectedBouquetAddons, id]);
    }
  };

  // Calculations in PKR
  const boxTotalPkr =
    selectedBox.pricePkr +
    selectedBoxItems.reduce((acc, currId) => {
      const item = SAMPLE_BOX_ITEMS.find((i) => i.id === currId);
      return acc + (item ? item.pricePkr : 0);
    }, 0);

  const bouquetTotalPkr =
    selectedFlower.pricePkr +
    selectedWrap.pricePkr +
    selectedRibbon.pricePkr +
    selectedBouquetAddons.reduce((acc, currId) => {
      const addon = BOUQUET_ADDONS.find((a) => a.id === currId);
      return acc + (addon ? addon.pricePkr : 0);
    }, 0);

  const activeTotalPkr =
    activeCustomizer === "box" ? boxTotalPkr : bouquetTotalPkr;

  const scrollToCustomizer = (mode: "box" | "bouquet") => {
    setActiveCustomizer(mode);
    const el = document.getElementById("customizer-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D]">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#6B1E2D] text-[#F8F1E7] px-4 py-2.5 text-xs font-medium tracking-widest text-center uppercase flex items-center justify-center gap-2 border-b border-[#501521]">
        <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
        <span>Complimentary Handwritten Calligraphy & Wax-Sealed Card on orders over Rs. 5,000</span>
        <span className="hidden md:inline">• Same-Day Hand Delivery in Lahore, Karachi & Islamabad</span>
      </div>

      {/* Main Luxury Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#F3E7D3]/90 backdrop-blur-md border-b border-[#E0CEB7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Navigation: Distinct entry points */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold">
            <button
              onClick={() => scrollToCustomizer("box")}
              className="hover:text-[#822436] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Gift className="h-3.5 w-3.5" />
              Customize Gift Box
            </button>
            <button
              onClick={() => scrollToCustomizer("bouquet")}
              className="hover:text-[#822436] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Flower2 className="h-3.5 w-3.5" />
              Customize Bouquet
            </button>
            <a href="#collections" className="hover:text-[#822436] transition-colors">
              Collections
            </a>
            <Link href="/faq" className="hover:text-[#822436] transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-[#822436] transition-colors">
              Contact
            </Link>
          </nav>

          {/* Central Luxury Brand Emblem */}
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
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#8C3A4B] bg-[#E8D8C3]/50 px-3 py-1 rounded-full border border-[#E0CEB7]">
              <span>PKR (Rs.)</span>
            </div>

            <button
              aria-label="Search items"
              className="p-2 rounded-full text-[#6B1E2D] hover:bg-[#E8D8C3] transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/auth"
              aria-label="User Account"
              className="p-2 rounded-full text-[#6B1E2D] hover:bg-[#E8D8C3] transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>

            <Button
              variant="default"
              size="sm"
              className="relative flex items-center gap-2"
              onClick={() => setIsOrderModalOpen(true)}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-[#C5A880] text-[#501521] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E0CEB7]">
        {/* Subtle Decorative Background Accents */}
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
            Mibella creates personalized gift boxes and handcrafted floral bouquets for life&apos;s most cherished milestones. From keepsake vessels to handwritten wax seals, every detail is assembled with genuine love.
          </p>

          {/* DEDICATED SEPARATE BUTTONS FOR GIFT BOX & BOUQUET */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <Button
              size="lg"
              className="w-full sm:w-1/2 text-xs sm:text-sm tracking-widest uppercase font-semibold py-6 shadow-md"
              onClick={() => scrollToCustomizer("box")}
            >
              <Gift className="h-4 w-4 mr-1 text-[#C5A880]" />
              Customize Gift Box
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-1/2 text-xs sm:text-sm tracking-widest uppercase font-semibold py-6 border-[#6B1E2D]/40 bg-[#F8F1E7] hover:bg-[#E8D8C3]"
              onClick={() => scrollToCustomizer("bouquet")}
            >
              <Flower2 className="h-4 w-4 mr-1 text-[#6B1E2D]" />
              Customize Bouquet
            </Button>
          </div>

          {/* DUAL ATELIER FEATURE CARDS */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            {/* Box Studio Card */}
            <div
              onClick={() => scrollToCustomizer("box")}
              className="cursor-pointer group p-6 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] hover:border-[#6B1E2D] hover:shadow-lg transition-all duration-300"
            >
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
                Choose magnetic luxury boxes, Belgian pralines, scented soy candles, silk sleepwear, and bespoke handwritten calligraphy notes.
              </p>
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#6B1E2D] group-hover:translate-x-1 transition-transform">
                Start Box Customization →
              </span>
            </div>

            {/* Bouquet Studio Card */}
            <div
              onClick={() => scrollToCustomizer("bouquet")}
              className="cursor-pointer group p-6 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] hover:border-[#6B1E2D] hover:shadow-lg transition-all duration-300"
            >
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
                Hand-select imported Ecuadorian roses, Dutch garden peonies, frosted Korean wrap paper, luxury velvet ties, and chocolate toppers.
              </p>
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#6B1E2D] group-hover:translate-x-1 transition-transform">
                Start Bouquet Customization →
              </span>
            </div>
          </div>

          {/* Value Assurances */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-[#E0CEB7]/80 text-left">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F1E7]/80 border border-[#E0CEB7]/70">
              <Sparkles className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">100% Bespoke</p>
                <p className="text-xs text-[#8C3A4B]">Customized to your exact taste</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F1E7]/80 border border-[#E0CEB7]/70">
              <Feather className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">Wax-Sealed Note</p>
                <p className="text-xs text-[#8C3A4B]">Handwritten calligraphy card</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F1E7]/80 border border-[#E0CEB7]/70">
              <Calendar className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">Scheduled Delivery</p>
                <p className="text-xs text-[#8C3A4B]">Choose date & delivery time</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8F1E7]/80 border border-[#E0CEB7]/70">
              <Truck className="h-5 w-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-semibold text-sm text-[#6B1E2D]">Pakistan Nationwide</p>
                <p className="text-xs text-[#8C3A4B]">Express door-to-door courier</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INTERACTIVE CUSTOMIZER (WITH SEPARATE BOX & BOUQUET MODES)   */}
      {/* ============================================================ */}
      <section id="customizer-section" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="gold" className="mb-3 tracking-widest text-[10px]">
            INTERACTIVE EXPERIENCE
          </Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#6B1E2D]">
            The MIBELLA Custom Atelier
          </h2>
          <p className="mt-3 text-[#8C3A4B] text-base leading-relaxed">
            Switch between building a **Custom Gift Box** or a **Custom Floral Bouquet**. Every choice updates your live order in real-time in PKR.
          </p>

          {/* MAIN PROMINENT MODE SWITCHER (SEPARATE BUTTONS) */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#E8D8C3] border border-[#E0CEB7] shadow-inner">
            <button
              onClick={() => setActiveCustomizer("box")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCustomizer === "box"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-md"
                  : "text-[#6B1E2D] hover:text-[#822436]"
              }`}
            >
              <Gift className="h-4 w-4" />
              Customize Gift Box
            </button>
            <button
              onClick={() => setActiveCustomizer("bouquet")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCustomizer === "bouquet"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-md"
                  : "text-[#6B1E2D] hover:text-[#822436]"
              }`}
            >
              <Flower2 className="h-4 w-4" />
              Customize Bouquet
            </button>
          </div>
        </div>

        {/* ------------------------------------------- */}
        {/* VIEW 1: CUSTOM GIFT BOX BUILDER             */}
        {/* ------------------------------------------- */}
        {activeCustomizer === "box" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Column: Box Steps */}
            <div className="lg:col-span-7 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm">
              <Tabs defaultValue="step-box" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 w-full">
                  <TabsTrigger value="step-box" className="text-xs sm:text-sm">
                    1. Box Vessel
                  </TabsTrigger>
                  <TabsTrigger value="step-items" className="text-xs sm:text-sm">
                    2. Curate Items ({selectedBoxItems.length}/5)
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
                    <span className="text-xs text-[#8C3A4B]">Magnetic closure & satin ribbon included</span>
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
                              ? "border-[#6B1E2D] bg-[#E8D8C3]/60 shadow-md ring-1 ring-[#6B1E2D]"
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
                          <p className="text-sm font-bold text-[#6B1E2D] mt-3">
                            Rs. {box.pricePkr.toLocaleString()}
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
                        Select Curated Luxuries
                      </h3>
                      <p className="text-xs text-[#8C3A4B]">
                        Pick up to 5 items to fill your chosen box.
                      </p>
                    </div>
                    <Badge variant="cream" className="font-semibold">
                      {selectedBoxItems.length} of 5 selected
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
                    {SAMPLE_BOX_ITEMS.map((item) => {
                      const isSelected = selectedBoxItems.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleBoxItem(item.id)}
                          className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                            isSelected
                              ? "border-[#6B1E2D] bg-[#E8D8C3]/70 shadow-xs"
                              : "border-[#E0CEB7] bg-[#F8F1E7] hover:bg-[#E8D8C3]/30"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C3A4B]">
                                {item.category}
                              </span>
                              <span className="text-[9px] bg-[#C5A880]/30 text-[#501521] px-1.5 py-0.5 rounded font-medium">
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
                              +Rs. {item.pricePkr.toLocaleString()}
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
                    Each note is inked by hand on heavy 350gsm cotton cardstock and sealed with our gold wax crest.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                        Recipient Name
                      </label>
                      <Input
                        value={cardRecipient}
                        onChange={(e) => setCardRecipient(e.target.value)}
                        placeholder="e.g. Ayesha, Mom, My Love"
                        className="bg-white/70"
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
                        className="w-full rounded-2xl border border-[#E0CEB7] bg-white/70 p-4 text-sm text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                        placeholder="Write your heartfelt message here..."
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex items-center gap-3">
                      <Feather className="h-5 w-5 text-[#6B1E2D]" />
                      <span className="text-xs text-[#6B1E2D]">
                        Gold wax seal finish & dried botanical lavender sprig included complimentary.
                      </span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column: Custom Box Live Summary */}
            <div className="lg:col-span-5 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-[#E0CEB7]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                    LIVE CURATION SUMMARY
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#6B1E2D]">
                    Your Custom Gift Box
                  </h3>
                </div>
                <Badge variant="gold" className="text-xs font-bold">
                  Rs. {boxTotalPkr.toLocaleString()} PKR
                </Badge>
              </div>

              {/* Vessel Selected */}
              <div className="py-4 border-b border-[#E0CEB7]/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8C3A4B]">Selected Box:</span>
                  <span className="font-semibold text-[#6B1E2D]">{selectedBox.name}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8C3A4B] mt-1">
                  <span>{selectedBox.size}</span>
                  <span>Rs. {selectedBox.pricePkr.toLocaleString()}</span>
                </div>
              </div>

              {/* Selected Items List */}
              <div className="py-4 border-b border-[#E0CEB7]/70 space-y-2">
                <span className="text-xs font-semibold text-[#8C3A4B] block">
                  Selected Luxuries ({selectedBoxItems.length}):
                </span>
                {selectedBoxItems.length === 0 ? (
                  <p className="text-xs italic text-[#8C3A4B]">No treats added yet. Select items from Step 2.</p>
                ) : (
                  selectedBoxItems.map((id) => {
                    const item = SAMPLE_BOX_ITEMS.find((i) => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs">
                        <span className="text-[#6B1E2D] truncate pr-2">• {item.name}</span>
                        <span className="text-[#8C3A4B] shrink-0 font-medium">
                          +Rs. {item.pricePkr.toLocaleString()}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Card Preview */}
              <div className="py-4 border-b border-[#E0CEB7]/70 bg-[#E8D8C3]/30 p-3.5 rounded-2xl my-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B1E2D] block mb-1">
                  Wax-Sealed Card To: {cardRecipient || "Recipient"}
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
                  Add Custom Box to Bag • Rs. {boxTotalPkr.toLocaleString()}
                </Button>
                <p className="text-center text-[11px] text-[#8C3A4B]">
                  Complimentary luxury magnetic box packaging & nationwide delivery options.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* VIEW 2: CUSTOM BOUQUET BUILDER              */}
        {/* ------------------------------------------- */}
        {activeCustomizer === "bouquet" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Column: Bouquet Steps */}
            <div className="lg:col-span-7 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm">
              <Tabs defaultValue="step-stems" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 w-full">
                  <TabsTrigger value="step-stems" className="text-xs sm:text-sm">
                    1. Floral Stems
                  </TabsTrigger>
                  <TabsTrigger value="step-wrapping" className="text-xs sm:text-sm">
                    2. Wrap & Ribbon
                  </TabsTrigger>
                  <TabsTrigger value="step-addons" className="text-xs sm:text-sm">
                    3. Bouquet Add-ons ({selectedBouquetAddons.length})
                  </TabsTrigger>
                </TabsList>

                {/* Step 1: Stems */}
                <TabsContent value="step-stems" className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                      Select Fresh Floral Variety
                    </h3>
                    <span className="text-xs text-[#8C3A4B]">Hand-conditioned fresh blooms</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BOUQUET_FLOWERS.map((flower) => {
                      const isSelected = selectedFlower.id === flower.id;
                      return (
                        <div
                          key={flower.id}
                          onClick={() => setSelectedFlower(flower)}
                          className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 ${
                            isSelected
                              ? "border-[#6B1E2D] bg-[#E8D8C3]/60 shadow-md ring-1 ring-[#6B1E2D]"
                              : "border-[#E0CEB7] bg-[#F8F1E7] hover:border-[#6B1E2D]/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A4B]">
                              {flower.origin}
                            </span>
                            <span className="text-xs text-[#6B1E2D] font-medium">
                              {flower.stemsCount}
                            </span>
                          </div>
                          <h4 className="font-serif font-semibold text-base text-[#6B1E2D]">
                            {flower.name}
                          </h4>
                          <p className="text-xs text-[#8C3A4B] mt-1">
                            Palette: {flower.colorTone}
                          </p>
                          <p className="text-sm font-bold text-[#6B1E2D] mt-3">
                            Rs. {flower.pricePkr.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Step 2: Wrapping & Ribbon */}
                <TabsContent value="step-wrapping" className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D] mb-1">
                      Choose Korean Paper Wrapping
                    </h3>
                    <p className="text-xs text-[#8C3A4B] mb-4">
                      Waterproof imported floral wraps styled with delicate pleats.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {BOUQUET_WRAPPINGS.map((wrap) => {
                        const isSelected = selectedWrap.id === wrap.id;
                        return (
                          <div
                            key={wrap.id}
                            onClick={() => setSelectedWrap(wrap)}
                            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                              isSelected
                                ? "border-[#6B1E2D] bg-[#E8D8C3]/70 shadow-xs ring-1 ring-[#6B1E2D]"
                                : "border-[#E0CEB7] bg-[#F8F1E7] hover:border-[#6B1E2D]/30"
                            }`}
                          >
                            <h4 className="font-serif font-semibold text-sm text-[#6B1E2D]">
                              {wrap.name}
                            </h4>
                            <p className="text-xs text-[#8C3A4B] mt-1 line-clamp-2">
                              {wrap.finish}
                            </p>
                            <p className="text-xs font-bold text-[#6B1E2D] mt-2">
                              +Rs. {wrap.pricePkr.toLocaleString()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E0CEB7]/70">
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D] mb-1">
                      Select Satin or Velvet Ribbon
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      {BOUQUET_RIBBONS.map((ribbon) => {
                        const isSelected = selectedRibbon.id === ribbon.id;
                        return (
                          <div
                            key={ribbon.id}
                            onClick={() => setSelectedRibbon(ribbon)}
                            className={`cursor-pointer p-3.5 rounded-2xl border transition-all ${
                              isSelected
                                ? "border-[#6B1E2D] bg-[#E8D8C3]/70 shadow-xs ring-1 ring-[#6B1E2D]"
                                : "border-[#E0CEB7] bg-[#F8F1E7] hover:border-[#6B1E2D]/30"
                            }`}
                          >
                            <h4 className="font-serif font-semibold text-xs text-[#6B1E2D]">
                              {ribbon.name}
                            </h4>
                            <p className="text-xs font-bold text-[#6B1E2D] mt-1">
                              +Rs. {ribbon.pricePkr.toLocaleString()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>

                {/* Step 3: Bouquet Add-ons */}
                <TabsContent value="step-addons" className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                        Add Bouquet Keepsakes
                      </h3>
                      <p className="text-xs text-[#8C3A4B]">
                        Attach chocolates, plush toys, or fragrance to your flowers.
                      </p>
                    </div>
                    <Badge variant="cream" className="font-semibold">
                      {selectedBouquetAddons.length} added
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BOUQUET_ADDONS.map((addon) => {
                      const isSelected = selectedBouquetAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleBouquetAddon(addon.id)}
                          className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                            isSelected
                              ? "border-[#6B1E2D] bg-[#E8D8C3]/70 shadow-xs"
                              : "border-[#E0CEB7] bg-[#F8F1E7] hover:bg-[#E8D8C3]/30"
                          }`}
                        >
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#8C3A4B] block">
                              {addon.tag}
                            </span>
                            <p className="font-serif font-medium text-sm text-[#6B1E2D]">
                              {addon.name}
                            </p>
                            <p className="text-xs font-bold text-[#6B1E2D] mt-1">
                              +Rs. {addon.pricePkr.toLocaleString()}
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
              </Tabs>
            </div>

            {/* Right Column: Custom Bouquet Live Summary */}
            <div className="lg:col-span-5 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-[#E0CEB7]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                    LIVE CURATION SUMMARY
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#6B1E2D]">
                    Your Custom Bouquet
                  </h3>
                </div>
                <Badge variant="gold" className="text-xs font-bold">
                  Rs. {bouquetTotalPkr.toLocaleString()} PKR
                </Badge>
              </div>

              {/* Flower Selected */}
              <div className="py-4 border-b border-[#E0CEB7]/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8C3A4B]">Base Blooms:</span>
                  <span className="font-semibold text-[#6B1E2D]">{selectedFlower.name}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8C3A4B] mt-1">
                  <span>{flowerStemDetail(selectedFlower)}</span>
                  <span>Rs. {selectedFlower.pricePkr.toLocaleString()}</span>
                </div>
              </div>

              {/* Wrap & Ribbon */}
              <div className="py-4 border-b border-[#E0CEB7]/70 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#8C3A4B]">Wrap:</span>
                  <span className="text-[#6B1E2D] font-medium">{selectedWrap.name} (+Rs. {selectedWrap.pricePkr})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8C3A4B]">Ribbon:</span>
                  <span className="text-[#6B1E2D] font-medium">{selectedRibbon.name} (+Rs. {selectedRibbon.pricePkr})</span>
                </div>
              </div>

              {/* Addons List */}
              <div className="py-4 border-b border-[#E0CEB7]/70 space-y-2">
                <span className="text-xs font-semibold text-[#8C3A4B] block">
                  Bouquet Add-ons ({selectedBouquetAddons.length}):
                </span>
                {selectedBouquetAddons.length === 0 ? (
                  <p className="text-xs italic text-[#8C3A4B]">No add-ons selected.</p>
                ) : (
                  selectedBouquetAddons.map((id) => {
                    const addon = BOUQUET_ADDONS.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs">
                        <span className="text-[#6B1E2D] truncate pr-2">• {addon.name}</span>
                        <span className="text-[#8C3A4B] shrink-0 font-medium">
                          +Rs. {addon.pricePkr.toLocaleString()}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Action CTA */}
              <div className="pt-4 space-y-3">
                <Button
                  size="lg"
                  className="w-full text-xs font-semibold uppercase tracking-widest"
                  onClick={() => setIsOrderModalOpen(true)}
                >
                  Add Custom Bouquet to Bag • Rs. {bouquetTotalPkr.toLocaleString()}
                </Button>
                <p className="text-center text-[11px] text-[#8C3A4B]">
                  Hand-tied with fresh flower food sachet & care instructions.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/* SIGNATURE READY-TO-SHIP CURATED COLLECTIONS (PKR)            */}
      {/* ============================================================ */}
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
                Thoughtfully assembled by our master florists and curators for immediate express delivery across Pakistan.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToCustomizer("box")}
                className="text-xs uppercase tracking-wider font-semibold"
              >
                Customize Box
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => scrollToCustomizer("bouquet")}
                className="text-xs uppercase tracking-wider font-semibold"
              >
                Customize Bouquet
              </Button>
            </div>
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
              Delivered on the exact date you choose with white-glove courier handling across Pakistan, ensuring pristine presentation upon arrival.
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
            &ldquo;The unboxing in Lahore was breathtaking. Opening the custom hatbox with the real wax seal and smelling the fresh rose candle made it the most memorable gift I have ever received.&rdquo;
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

      {/* Shared Luxury Footer with Full Legal Links */}
      <Footer />

      {/* ============================================================ */}
      {/* CART & CHECKOUT PREVIEW DIALOG (PKR)                         */}
      {/* ============================================================ */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your MIBELLA Bag</DialogTitle>
            <DialogDescription>
              Review your customized creation and set delivery details for Pakistan.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Itemized summary */}
            <div className="p-4 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] space-y-2">
              <div className="flex justify-between items-center text-sm font-serif font-semibold">
                <span>
                  {activeCustomizer === "box" ? selectedBox.name : `${selectedFlower.name} Bouquet`}
                </span>
                <span className="font-bold text-[#6B1E2D]">
                  Rs. {activeTotalPkr.toLocaleString()} PKR
                </span>
              </div>
              <p className="text-xs text-[#8C3A4B]">
                {activeCustomizer === "box"
                  ? `${selectedBoxItems.length} curated treats & wax calligraphy card`
                  : `${selectedWrap.name} + ${selectedRibbon.name} & ${selectedBouquetAddons.length} add-ons`}
              </p>
              {activeCustomizer === "box" && (
                <p className="text-xs italic text-[#8C3A4B] border-t border-[#E0CEB7] pt-2">
                  Card note: &ldquo;{cardMessage}&rdquo;
                </p>
              )}
            </div>

            {/* City Selection in Pakistan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Destination City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-11 rounded-full border border-[#E0CEB7] bg-white/70 px-4 text-sm text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
              >
                <option value="Lahore">Lahore (Same-Day Hand Delivery)</option>
                <option value="Karachi">Karachi (Same-Day Hand Delivery)</option>
                <option value="Islamabad">Islamabad (Same-Day Hand Delivery)</option>
                <option value="Rawalpindi">Rawalpindi (Same-Day Hand Delivery)</option>
                <option value="Faisalabad">Faisalabad (Next-Day Delivery)</option>
                <option value="Multan">Multan (Next-Day Delivery)</option>
                <option value="Peshawar">Peshawar (Next-Day Delivery)</option>
                <option value="Sialkot">Sialkot (Next-Day Delivery)</option>
                <option value="Gujranwala">Gujranwala (Next-Day Delivery)</option>
                <option value="Quetta">Quetta (Express Courier)</option>
                <option value="Other">Other Pakistan City</option>
              </select>
            </div>

            {/* Scheduled Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Scheduled Delivery Date
              </label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="bg-white/70"
              />
            </div>

            {/* Recipient Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B]">
                Gift Recipient Full Address & Contact
              </label>
              <Input
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="House #, Street, Area, Contact #"
                className="bg-white/70"
              />
            </div>

            {/* Price Breakdown */}
            <div className="pt-2 border-t border-[#E0CEB7] space-y-1 text-xs text-[#8C3A4B]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {activeTotalPkr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className={activeTotalPkr >= 5000 ? "text-emerald-700 font-semibold" : ""}>
                  {activeTotalPkr >= 5000 ? "FREE (Orders over Rs. 5,000)" : "Rs. 350"}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#6B1E2D] pt-1 border-t border-[#E0CEB7]/60">
                <span>Total Amount:</span>
                <span>
                  Rs. {(activeTotalPkr + (activeTotalPkr >= 5000 ? 0 : 350)).toLocaleString()} PKR
                </span>
              </div>
            </div>

            <Button
              className="w-full text-xs font-semibold uppercase tracking-widest mt-4 py-6"
              size="lg"
              onClick={() =>
                alert(
                  `Order recorded! Total: Rs. ${(
                    activeTotalPkr + (activeTotalPkr >= 5000 ? 0 : 350)
                  ).toLocaleString()} PKR for ${selectedCity}. Connected to Supabase.`
                )
              }
            >
              Proceed to Gifting Checkout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function flowerStemDetail(flower: FlowerStem) {
  return `${flower.stemsCount} • ${flower.colorTone}`;
}
