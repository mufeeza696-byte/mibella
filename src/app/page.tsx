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
  Camera,
  ImageIcon,
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
import { Navbar } from "@/components/navbar";
import {
  SAMPLE_BOX_ITEMS,
  BOX_STYLES,
  BOUQUET_FLOWERS,
  BOUQUET_WRAPPINGS,
  BOUQUET_RIBBONS,
  BOUQUET_ADDONS,
  SIGNATURE_COLLECTIONS,
  CustomBoxItem,
  FlowerStem,
} from "@/lib/catalog-data";

export default function HomePage() {
  // Mode selection: "box" or "bouquet"
  const [activeCustomizer, setActiveCustomizer] = useState<"box" | "bouquet">("box");

  // Box Customizer State
  const [selectedBox, setSelectedBox] = useState(BOX_STYLES[0]);
  const [selectedBoxItems, setSelectedBoxItems] = useState<string[]>([
    "item-jhumka",
    "item-scented-candle",
    "item-chocolate",
  ]);
  const [boxCategoryFilter, setBoxCategoryFilter] = useState<string>("all");
  const [includePhoto, setIncludePhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState("");
  const [cardMessage, setCardMessage] = useState(
    "Wishing you endless joy and blooming memories on your special day."
  );
  const [cardRecipient, setCardRecipient] = useState("Ayesha");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setIncludePhoto(true);
      };
      reader.readAsDataURL(file);
    }
  };

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
      if (selectedBoxItems.length < 6) {
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
    }, 0) +
    (includePhoto ? 250 : 0);

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
      <Navbar />

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

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#8C3A4B]">
            <span>Looking for ready-to-ship gifts or standalone treats?</span>
            <Link
              href="/catalog"
              className="font-semibold text-[#6B1E2D] hover:text-[#822436] underline underline-offset-4 flex items-center gap-1"
            >
              Browse Complete Catalog <ArrowRight className="h-3 w-3" />
            </Link>
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
                    2. Items ({selectedBoxItems.length}/6)
                  </TabsTrigger>
                  <TabsTrigger value="step-card" className="text-xs sm:text-sm">
                    3. Card & Photo {includePhoto ? "📸" : ""}
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

                {/* Step 2: Curate Items (With Category Filter Pills) */}
                <TabsContent value="step-items" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                        Select Curated Luxuries
                      </h3>
                      <p className="text-xs text-[#8C3A4B]">
                        Pick up to 6 treasures to fill your custom box.
                      </p>
                    </div>
                    <Badge variant="cream" className="font-semibold self-start sm:self-auto">
                      {selectedBoxItems.length} of 6 selected
                    </Badge>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pb-2">
                    {[
                      { id: "all", label: "All Items" },
                      { id: "Jewelry", label: "Jewelry" },
                      { id: "Crochet", label: "Crochet" },
                      { id: "Makeup", label: "Makeup" },
                      { id: "Coffee Cup & Snacks", label: "Cups & Snacks" },
                      { id: "Scented Candle", label: "Candle" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setBoxCategoryFilter(cat.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          boxCategoryFilter === cat.id
                            ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-xs"
                            : "bg-[#E8D8C3]/60 text-[#6B1E2D] hover:bg-[#E8D8C3]"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
                    {SAMPLE_BOX_ITEMS
                      .filter((item) => boxCategoryFilter === "all" || item.category === boxCategoryFilter)
                      .map((item) => {
                        const isSelected = selectedBoxItems.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleBoxItem(item.id)}
                            className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 ${
                              isSelected
                                ? "border-[#6B1E2D] bg-[#E8D8C3]/70 shadow-xs ring-1 ring-[#6B1E2D]/40"
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

                {/* Step 3: Calligraphy & Added Picture */}
                <TabsContent value="step-card" className="space-y-5">
                  <div className="space-y-3">
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
                          rows={3}
                          value={cardMessage}
                          onChange={(e) => setCardMessage(e.target.value)}
                          className="w-full rounded-2xl border border-[#E0CEB7] bg-white/70 p-3.5 text-sm text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                          placeholder="Write your heartfelt message here..."
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex items-center gap-3">
                        <Feather className="h-4 w-4 text-[#6B1E2D] shrink-0" />
                        <span className="text-xs text-[#6B1E2D]">
                          Gold wax seal finish & dried lavender sprig included complimentary.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ADDED PICTURE (PHOTO PRINT UPLOAD) */}
                  <div className="pt-4 border-t border-[#E0CEB7]/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-base font-semibold text-[#6B1E2D] flex items-center gap-2">
                          <Camera className="h-4 w-4 text-[#C5A880]" />
                          Include a Printed Keepsake Photo
                        </h4>
                        <p className="text-xs text-[#8C3A4B]">
                          Upload a memory to be printed on archival gloss cardstock inside the box (+Rs. 250).
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIncludePhoto(!includePhoto)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                          includePhoto ? "bg-[#6B1E2D]" : "bg-[#E0CEB7]"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            includePhoto ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {includePhoto && (
                      <div className="p-4 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] space-y-3">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                          Upload Photograph (JPG or PNG)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="text-xs text-[#6B1E2D] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#6B1E2D] file:text-[#F8F1E7] hover:file:bg-[#822436] file:cursor-pointer cursor-pointer"
                        />

                        {photoPreview && (
                          <div className="flex items-center gap-4 pt-2">
                            <div className="p-2 bg-white rounded-xl shadow-md border border-[#E0CEB7] max-w-[120px] text-center">
                              <img
                                src={photoPreview}
                                alt="Uploaded Keepsake"
                                className="w-24 h-24 object-cover rounded-lg mx-auto"
                              />
                              <span className="text-[9px] text-[#8C3A4B] mt-1 block font-serif italic">
                                {photoCaption || "Photo Attached"}
                              </span>
                            </div>
                            <div className="space-y-1.5 flex-1">
                              <label className="text-[11px] font-semibold text-[#8C3A4B] block">
                                Photo Caption or Date (Optional)
                              </label>
                              <Input
                                value={photoCaption}
                                onChange={(e) => setPhotoCaption(e.target.value)}
                                placeholder="e.g. Always & Forever • 2026"
                                className="bg-white/80 text-xs h-9"
                              />
                              <p className="text-[10px] text-emerald-800 font-medium">
                                ✓ Photo will be packaged in a delicate wax-stamped protective glassine pouch.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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

              {/* Photo Keepsake Preview */}
              {includePhoto && (
                <div className="py-3 border-b border-[#E0CEB7]/70 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Photo keepsake"
                        className="w-9 h-9 rounded-lg object-cover border border-[#E0CEB7]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-[#E0CEB7]/60 flex items-center justify-center text-[#6B1E2D]">
                        <Camera className="h-4 w-4" />
                      </div>
                    )}
                    <div>
                      <span className="text-[#6B1E2D] font-medium block">
                        • Keepsake Photo Print
                      </span>
                      <span className="text-[10px] text-[#8C3A4B] italic">
                        {photoCaption ? `"${photoCaption}"` : "Protective pouch included"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[#8C3A4B] shrink-0 font-medium">+Rs. 250</span>
                </div>
              )}

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
            {SIGNATURE_COLLECTIONS.slice(0, 3).map((col) => (
              <Card
                key={col.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-[#E0CEB7] flex flex-col justify-between bg-[#F8F1E7]/80"
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
                Browse our dedicated catalog page featuring all 25+ artisanal items, Kundan jewelry, handmade crochet gajras, scented candles, and luxury bouquets with live search and category filters.
              </p>
            </div>
            <Link href="/catalog" className="shrink-0 w-full md:w-auto">
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
                  ? `${selectedBoxItems.length} curated treats & wax calligraphy card${
                      includePhoto ? " + photo print" : ""
                    }`
                  : `${selectedWrap.name} + ${selectedRibbon.name} & ${selectedBouquetAddons.length} add-ons`}
              </p>
              {activeCustomizer === "box" && includePhoto && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#E0CEB7]/70">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Keepsake Photo"
                      className="w-7 h-7 rounded object-cover border border-[#E0CEB7]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded bg-[#E0CEB7] flex items-center justify-center text-[#6B1E2D]">
                      <Camera className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <span className="text-xs text-[#6B1E2D]">
                    Photo attached: {photoCaption ? `"${photoCaption}"` : "Keepsake print in pouch"} (+Rs. 250)
                  </span>
                </div>
              )}
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
